
<template>
  <v-row  class="mt-5 pl-5 pr-15 text-h5" style="width: 100%;">
    <router-link v-if="id !== ''" :to="`/album/${id}`">{{ name }}</router-link>
    <template v-else>{{ name }}</template>
    <v-btn class="ml-3" prepend-icon="mdi-plus" size="small" color="green" rounded @click="addPhoto">
      Photo
    </v-btn>

    <v-spacer></v-spacer>
    <template v-if="showDetailController">
      <v-btn icon="mdi-selection" size="small"></v-btn>
      <v-btn class="ml-3" icon="mdi-delete" size="small" @click="delAlbum"></v-btn>
    </template>
  </v-row>
</template>

<script setup lang="js">
import { defineProps, defineEmits } from 'vue';
// import { deleteAlbum } from "../../graphql/mutations";
import { deleteAlbum } from '@/graphql/mutations';
const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  showDetailController: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['registerPhoto'])

//写真追加
const addPhoto = () => {
  console.log("push button",props.name,props.id);
  emit('registerPhoto', props.name)
}

//アルバム削除
async function delAlbum() {
  console.log('delAlbum',props.id);
  
  if (!confirm("Delete Album?")) return;

  await API.graphql({
    query: deleteAlbum,
    variables: { input: { id: props.id } },
  })
    .then((result) => {
      console.log(result);
      this.albums.splice(index, 1);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>


<script  lang="js">
import { Amplify } from "aws-amplify";
import { generateClient  } from "aws-amplify/api";

import {  listAlbums } from '@/graphql/queries';

import config from  '@/aws-exports';

Amplify.configure(config);
const API = generateClient ()

export default {
  name: "AlbumIndex",
  // async created() {
  //   this.getAlbums();
  // },
  // data() {
  //   return {
  //     albums: [],
  //   };
  // },
  methods: {
    
  },
};
</script>