<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in menu">
          
          <v-list-tile :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link :to="item.link">
                 {{ item.text }}
                </router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
        </template>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

    </v-toolbar>
    <v-container fluid fill-height>
      <h3 class="display-2"> {{title}}  </h3>
    </v-container>
    
    <!-- <v-content> -->
      <v-container fluid fill-height>
        <!-- <Datatable v-bind:data="campos"/> -->
      <Grid 
        :key_grid.sync="key_grid" 
        :headers.sync="headers" 
        :items.sync="items" 
        :columns.sync="columns" 
        :loading.sync="loading" 
        :pagination.sync="pagination"
        :action="false"/>  

      </v-container>
    <!-- </v-content> -->
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <!-- <form @submit="cadastrar" action="http://localhost/listapreco-api/lista" method="post"> -->
        <v-card>
          <v-card-title
            class="grey lighten-4 py-4 title"
          >
            Cadastrar lista
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    v-model="postData.titulo"
                    placeholder="Título"  
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs6 sm6 d-flex>
                <v-select
                  v-model="postData.fornecedorId"
                  :items="fornecedores"
                  item-value="id"
                  item-text="nomeFornecedor"
                  label="Fornecedor"
                  return-object
                  single-line
                ></v-select>
              </v-flex>
            
              <v-flex xs6 lg4>
                <h4>Vigência</h4>
                <input v-model="postData.dataVigencia" type="date" id="vigencia"/>
              </v-flex>

              <v-flex xs6>
                <input type="file" ref="files" id="files" multiple v-on:change="handleFiles()"/>
              </v-flex>

              <!-- <v-flex xs6 lg4>
                <h4>Validade</h4>
                <input v-model="postData.validade" type="date" id="validade"/>
              </v-flex> -->
              
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" v-on:click="cadastrar">Salvar</v-btn>
            <v-btn flat @click="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data(){
      return {
        date: new Date().toISOString().substr(0, 10),
        dialog: false,
        drawer: null,
        files: '',
        title: this.$route.meta.title,
        items: [],
        post_url: 'files',
        fornecedores: [],
        postData:{
          caminho: null,
          titulo: null,
          fornecedorId: [],
          dataVigencia: null,
          validade: null
        },
        menu: [
          { icon: 'content_copy', text: 'Listas', link:'/lista' },
          { icon: 'contacts', text: 'Fornecedores', link: '/fornecedor' },
          { icon: 'storage', text: 'Produtos', link:'/teste' },
          { icon: 'storage', text: 'Campos Planilha', link: '/home' },
        ],
        headers: [
          {
            text: 'Codigo',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          {
            text: 'Título',
            align: 'left',
            sortable: false,
            value: 'titulo'
          },
          {
            text: 'Vigência',
            align: 'left',
            sortable: false,
            value: 'dataVigencia',
            width: '160'
          },
          {
            text: 'Validade',
            align: 'left',
            sortable: false,
            value: 'validade'
          },
          {
            text: 'Fornecedor',
            align: 'left',
            sortable: false,
            value: 'fornecedor'
          },
          {
            text: 'Status',
            align: 'left',
            sortable: false,
            value: 'ativo'
          },

        ],
        columns: [
          {
            text: 'id'
          },
          {
            text: 'titulo',
            truncate: true
          },
          {
            text: 'dataVigencia',
            truncate: true
          },
          {
            text: 'validade',
            truncate: true
          },
          {
            text: 'fornecedor',
            truncate: true
          },
          {
            text: 'ativo',
            truncate: true
          }
        ],
        key_grid: 'campoId', 
        loading: false,
        pagination: {
          page: 1,
          rowsPerPage: 15,
          totalVisible: 10,
          descending: false,
          totalItems: 0
        }
      }
    },
    mounted(){
      // select das listas
      this.getListas(),

      // select dos fornecedores para cadastro da lista
      this.getFornecedores()
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods:{

      async getFornecedores(){
        const fornecedores = await this.$http.get('http://localhost/listapreco-api/fornecedor')
        this.fornecedores = fornecedores.data.data
      },
      async getListas(){
        const listas = await this.$http.get('http://localhost/listapreco-api/lista')
        this.items = listas.data.data
      
      },

      async cadastrar(){

        let formData = new FormData();
        formData.append('file', this.files)
        let teste = localstorage.root.getFile("lista-3m-abril-2019.xls", {create: true});
        console.log(teste)
        this.postData.fornecedorId =  this.postData.fornecedorId.id
        this.postData.caminho = formData.get('file')
        console.log(this.postData.caminho.name)

        const listas = await this.$http.post('http://localhost/listapreco-api/lista', 
        this.postData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

      },

      handleFiles() {
        this.files = this.$refs.files.files[0];
        console.log(this.files)
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    props: {
      source: String
    }
  }
</script>