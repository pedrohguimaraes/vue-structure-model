<template>
  <HomeComp />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComp from '@/components/Home.vue';

@Component({
  components: {
    HomeComp,
  },
})
export default class Home extends Vue{}
</script>