<template>
  <v-app id="app">
    <v-content>
      	<v-fade-transition mode="out-in">
        	<router-view/>
      	</v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
  // export default {
  //   data: () => ({

  //   }),
  //   computed: {
  //     isLogged(){ 
  //       return this.$store.getters['user/isLogged']; 
  //     }
  //   }
  // }
</script>

<style lang="scss">

/*SASS*/
@import '@/styles/index.scss';
</style>
