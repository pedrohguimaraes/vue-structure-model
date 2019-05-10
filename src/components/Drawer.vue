<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    fixed
    clipped
    app>
    <v-toolbar 
      flat>
      <v-img
        class="mt-3"
        :src="logo_full">
      </v-img>
    </v-toolbar>
    <v-divider
      class="my-3">
    </v-divider>
    <v-list
    dense>
      <v-list-tile v-for="(item, i) in items"
        :key="i"
        >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      logo_full: './img/logo_full.png',
      drawer: null,
      items: [
        { icon: 'mdi-lightbulb_outline', text: 'Notes' },
        { icon: 'mdi-touch_app', text: 'Reminders' },
        { icon: 'mdi-add', text: 'Create new label' },
        { icon: 'mdi-archive', text: 'Archive' },
        { icon: 'mdi-delete', text: 'Trash' },
        { icon: 'mdi-settings', text: 'Settings' },
        { icon: 'mdi-chat_bubble', text: 'Trash' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-phonelink', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Keyboard shortcuts' }
      ]
    })
  }
</script>

<style lang="scss">

</style>