<template>


  <v-card>
    <v-card-title>
      Nutrition 
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="lista"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.campoId }}  </td>
        <td class="text-xs-right">{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.descricao}}</td>
        <td class="text-xs-right">{{ props.item.tipo }}</td>
        <td class="text-xs-right">{{ props.item.listaID }}</td>
        <td class="text-xs-right">{{ props.item.titulo }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

  export default {

    data () {
       
      return {
          
        search: '',
        headers: [
            {
                text: 'Código',
                align: 'left',
                sortable: false,
                value: 'campoId'
            },    
            {text: 'Nome', value: 'nome'},
            {text: 'Descrição', value: 'descricao'},
            {text: 'Tipo', value: 'tipo'},
            {text: 'Código da lista', value: 'listaID'},
            {text: 'Lista', value: 'titulo'},
        ],
        desserts: [
          {
            campoId: 'Frozen Yogurt',
            nome: 159,
            descricao: 6.0,
            tipo: 24,
            listaID: 4.0,
            titulo: '1%'
          }         
        ]
      }
    }, 
    props: ['lista']
  }


</script>