<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>PhotoLibrary</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <h1>test</h1>
      <template v-if="auth.route === 'authenticated'">
        <h1>test</h1>
        <!-- <div class="d-flex justify-space-around"> -->
          <v-icon :icon="`mdiSvg:${mdiAccount}`"></v-icon>
          <v-icon :icon="`mdiSvg:${mdiDelete}`"></v-icon>
          <v-icon icon="mdiAccount"></v-icon>
        <!-- </div> -->
      </template>

      <!-- <v-container fluid> -->
        <router-view/>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>


<script setup>
import { useAuthenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { mdiAccount } from '@mdi/js'
// import LinksList from './views/LinksList.vue';
// import { ref } from 'vue'

  // const drawer = ref(null)
const auth = useAuthenticator();
</script>

<script>
  // import {
  //   mdiAccount,
  //   mdiDelete,
  //   mdiPencil,
  //   mdiShareVariant,
  // } from '@mdi/js'

  // export default {
  //   data: () => ({
  //     mdiAccount,
  //     mdiPencil,
  //     mdiShareVariant,
  //     mdiDelete,
  //   }),
  // }
  // export default {
  //   data: () => ({ drawer: null }),
  // }
</script>