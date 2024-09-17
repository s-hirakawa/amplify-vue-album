/* eslint-disable */
<template>
  <v-app-bar>
    <v-app-bar-title>Application</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="auth.authStatus === 'authenticated'"  @click="auth.signOut" to="/signin">Sign out</v-btn>
    <v-btn v-if="userName" prepend-icon="mdi-account">{{userName}}</v-btn>
  </v-app-bar>
  
  <v-main class="bg-grey-lighten-2">
    <slot/>
  </v-main>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useAuthenticator  } from '@aws-amplify/ui-vue'

  const auth = useAuthenticator();


  const store = useStore();
  // Vuexストアからユーザー名を取得
  const userName = computed(() => (store.getters['user/getUserInfo'].name))

</script>

