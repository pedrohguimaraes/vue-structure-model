<template>
  <AdminComp />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminComp from '@/components/Admin.vue';

@Component({
  components: {
    AdminComp,
  },
})
export default class Admin extends Vue{}
</script>