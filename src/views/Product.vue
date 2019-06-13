<template>
  <v-container>
    <Grid 
      :key_grid.sync="key_grid" 
      :headers.sync="headers" 
      :items.sync="items" 
      :columns.sync="columns" 
      :loading.sync="loading" 
      :pagination.sync="pagination"
      @update:pagination="updatePagination"
      @deleteRows="deleteRows"/>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        {
          text: 'Codprod',
          align: 'left',
          sortable: true,
          value: 'codigo'
        },
        {
          text: 'Descrição',
          align: 'left',
          sortable: false,
          value: 'descricao'
        },
        {
          text: 'Conteúdo Descricao',
          align: 'left',
          sortable: false,
          value: 'conteudoDescricao'
        },
        {
          text: 'Breve Descricao',
          align: 'left',
          sortable: false,
          value: 'breveDescricao'
        },
        {
          text: 'Ação',
          align: 'center',
          sortable: false,
          value: '',
          width: '160'
        }
      ],
      items: [],
      columns: [
        {
          text: 'codigo'
        },
        {
          text: 'descricao',
          truncate: true
        },
        {
          text: 'conteudoDescricao',
          truncate: true
        },
        {
          text: 'breveDescricao',
          truncate: true
        }
      ],
      key_grid: 'codigo',
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 15,
        totalVisible: 10,
        descending: false,
        totalItems: 0
      }
    }),
    mounted() {
      this.loadList();
    },
    methods: {
      loadList: async function (){
        this.loading = true;
        let params = this.paramsURL({perPage: this.pagination.rowsPerPage, page: this.pagination.page});
        let list = await services.general.list(services.product.baseUrl, params);
        this.pagination.totalItems = list.total;
        this.items = list.data;
        this.loading = false;
      },
      updatePagination: function(pagination){
        this.pagination.page = pagination.page;
        this.loadList();
      },
      deleteRows: function(data){
        this.loading = true;
        this.pagination.page = data.pagination.page;
        this.loadList();
        this.loading = false;
      },
      saveRow: async function(rows){

      }
    }
  }
</script>

<style lang="scss">

</style>