<template>
  <v-container>

    <v-toolbar flat color="transparent">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
        class="pb-3 flex xs12 sm12 md8">
      </v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="container-table">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :item-key="key_grid"
        :total-items="paginationCopy.totalItems"
        :pagination.sync="paginationCopy"
        v-model="selected"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        sort-icon="mdi-menu-down"
        select-all
        hide-actions
        expand
        @input="input">
        <template slot="no-data">
          <div class="text-xs-center">
            Ocorreu um erro inesperado! Tente novamente.
          </div>
        </template>
        <template slot="no-results-text">
          <div class="text-xs-center">
            Ocorreu um erro inesperado! Tente novamente.
          </div>
        </template>
        <template slot="no-results">
          <div class="text-xs-center">
            Não foi possível localizar o item.
          </div>
        </template>
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <v-checkbox
                :input-value="props.all"
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td v-for="(column,i) in columns">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-if="column.truncate == true" v-on="on">{{props.item | searchColumnValue(column.text) | truncate(columns) }}</span>
                  <span v-else v-on="on">{{props.item | searchColumnValue(column.text)}}</span>
                </template>
                <span>{{props.item | searchColumnValue(column.text)}}</span>
              </v-tooltip>
            </td>
            <td class="text-xs-center" v-if="action == true">
              <v-tooltip bottom>
                <v-btn 
                  flat 
                  icon 
                  color="primary"
                  slot="activator">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn 
                  flat 
                  icon 
                  color="primary"
                  slot="activator"
                  @click.native="openDialogDelete(props.item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <span>Excluir</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="text-xs-center mt-3">
        <v-pagination 
          v-model="paginationCopy.page" 
          :length="pages" 
          :total-visible="paginationCopy.totalVisible">
        </v-pagination>
      </div>
      <v-fab-transition>
      <v-btn
        color="primary"
        dark
        bottom
        right
        fab
        fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <div
        v-if="loading"
        class="text-xs-center progress-circular-grid">
        <v-progress-circular
          :size="150"
          :width="3"
          color="primary"
          indeterminate>
        </v-progress-circular>
      </div>
    </div>
    <v-dialog/>
  </v-container>
</template>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        default: []
      },
      key_grid: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        default: []
      },
      columns: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Object,
        default: {}
      },
      mark:{
        type: Boolean,
        default: true
      },
      action:{
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      search: null,
      selected: [],
      page: 1,
      paginationCopy: {}
    }),
    mounted(){
      this.paginationCopy = this.pagination;
    },  
    watch:{
      paginationCopy: {
        handler (v) {
          if(this.page != v.page){

            this.page = v.page;

            this.$emit('update:pagination', v);
          }
        },
        deep: true
      },
      pagination: {
        handler(v){
          this.paginationCopy = v;
        },
        deep: true
      }
    },
    methods: {
      input: function(v){
      },
      openDialogDelete(selected){
        this.$modal.show('dialog', {
          title: 'Deseja exluir o(s) item(ns) selecionados?',
          text: 'Caso o(s) item(ns) seja(m) excluído(s), o(s) mesmo(s) não será(ão) recuperado(s).',
          buttons: [
            {
              title: 'Excluir',
              handler: () => { 
                
                this.$emit('deleteRows', {'selected': selected, 'pagination': this.pagination});
                this.$modal.hide('dialog');
              }
            },
            {
              title: 'Fechar'
            }
         ]
        })
      }
    },
    computed: {
      pages: function(){
        if (!this.paginationCopy.rowsPerPage || !this.paginationCopy.totalItems) 
          return 0

        return Math.ceil(this.paginationCopy.totalItems / this.paginationCopy.rowsPerPage);
      }
    },
    filters: {
      searchColumnValue: function(v, v1){
        if(v1 && v1){
          return v[v1];
        }
      },
      truncate: function(v, columns){
        if(v){
          const columnsLength = columns.length + 1;
          let length = Math.round(((v.length / columnsLength) * 2 ) + 10);
          return v.length > length ? v.slice(0, length).trim() + '...' : v;
        }
      }
    }
  }
</script>

<style lang="scss">
  .container-table{
    position: relative;
    .progress-circular-grid{
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      bottom:0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255,255,255, 0.7);
    }
  }
</style>