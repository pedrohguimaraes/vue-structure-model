<template>
  <Lista />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Lista from '@/components/lista/Lista.vue';

  @Component({
    components: {
      Lista
    },
  })
  export default class Admin extends Vue{}
</script>