
<template>
  <BaseLayout>
    <v-container>
      <authenticator>
        <template  v-if="auth.authStatus === 'authenticated'" v-slot="{ user, signOut }">
          <h1>Hello {{ user.username }}!</h1>
          <v-btn to="/album" @click="pushAlbumlsit">ALUBUM一覧</v-btn>
          <v-btn @click="signOut">Sign Out</v-btn>
        </template>
      </authenticator>
    </v-container>
  </BaseLayout>
</template>

<script setup>
import { useStore }from 'vuex'
import { Amplify } from 'aws-amplify';
import { Authenticator , useAuthenticator } from '@aws-amplify/ui-vue'

import awsconfig from '@/aws-exports';
import BaseLayout from '../templates/BaseLayout.vue';
import "@aws-amplify/ui-vue/styles.css";

// import { generateClient  } from "aws-amplify/api";
// import { listAlbums } from "../../graphql/queries";
// Authenticatorの外部認証に使用
Amplify.configure(awsconfig);

const store = useStore();
const auth = useAuthenticator();

const pushAlbumlsit = () => {
  // ログインしたユーザをstoreに登録
  store.dispatch(
    'user/login',
    { id: auth.user.userId, name: auth.user.username, email: 'john@example.com', token: 'abc123' }
  )
  // getAlbums()
}

// async function getAlbums() {
//   await API.graphql({query: listAlbums,})
//     .then((result) => {
//       console.log('result',result);
//       const albumlist = result.data.listAlbums.items
//       store.dispatch(
//         'albums/createAlbum',
//         { id: albumlist[0].id, name: albumlist[0].name, photos: [1]}
//       )
//     })
//     .catch((error) => {
//       console.log('error',error);
//     });
//     console.log('store.getters[albums/getAllAlbums]', store.getters['albums/getAllAlbums']);
//   }
</script>