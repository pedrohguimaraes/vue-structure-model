<template>
  <v-toolbar
    id="app-toolbar"
    flat>
     <v-tooltip 
      bottom>
      <v-toolbar-side-icon
        slot="activator">
      </v-toolbar-side-icon>
      <span>Menu</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip 
      bottom>
      <v-btn
        slot="activator"
        color="primary"
        icon
        flat>
          <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <span>Pesquisar</span>
    </v-tooltip>
    <v-tooltip 
      bottom>
      <v-btn
        slot="activator"
        color="primary"
        icon
        flat>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <span>Dashboard</span>
    </v-tooltip>
    <menu>
      <v-tooltip 
        bottom
        slot="activator">
        <v-btn
          slot="activator"
          color="primary"
          icon
          flat>
          <v-badge 
            color="red"
            overlap>
            <span slot="badge">9</span>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <span>Notificações</span>
      </v-tooltip>
    </menu>
    <v-menu>
      <v-tooltip 
        bottom
        slot="activator">
        <v-btn
          slot="activator"
          color="primary"
          icon

          flat>
          <v-icon>mdi-email</v-icon>
        </v-btn>
        <span>Mensagens</span>
      </v-tooltip>
    </v-menu>
      <!-- <v-text-field
        label="Pesquisar"
        single-line
        hide-details
        append-icon="mdi-magnify"
      ></v-text-field> -->  
  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>