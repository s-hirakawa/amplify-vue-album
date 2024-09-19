
<template>
  <v-row  class="mt-5 pl-5 pr-15 text-h5" style="width: 100%;">
    <router-link v-if="isLink" :to="`/album/${id}`">{{ name }}</router-link>
    <template v-else>{{ name }}</template>
    <v-btn class="ml-3" prepend-icon="mdi-plus" size="small" color="green" rounded @click="addPhoto">
      Photo
    </v-btn>

    <v-spacer></v-spacer>
    <template v-if="showDetailController">
      <v-btn icon="mdi-selection" size="small" @click="changeSelection"></v-btn>
      <v-btn class="ml-3" icon="mdi-delete" size="small" @click="delAlbum"></v-btn>
    </template>
  </v-row>
</template>

<script setup lang="js">
import router from '@/router'
import config from  '@/aws-exports';
import { remove } from 'aws-amplify/storage';
import { useStore } from 'vuex'
import { Amplify } from "aws-amplify";
import { generateClient  } from "aws-amplify/api";
import { deleteAlbum , deletePhoto} from '@/graphql/mutations';
import { defineProps, defineEmits, ref } from 'vue';

const store = useStore()
Amplify.configure(config);

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
  },
  photos: {
    type: Array,
    required: true
  },
  isLink: {
    type: Boolean,
    default: false
  },
})

const changeSelection = () =>{
  // state更新
  console.log('store.dispatch',store.dispatch);
  store.dispatch('activechange')
}

const emit = defineEmits(['registerPhoto'])

//写真追加
const addPhoto = () => {
  emit('registerPhoto', props.id)
  console.log("push addPhoto",props.id);
}

//アルバム削除
const delAlbum = async() => {
  emit('registerPhoto', props.name)
  console.log('delAlbum id',props.id);
  console.log('delPhoto',props.photos);
  if (!confirm("Delete Album?")) return;

  // Albumテーブル削除
  await API.graphql({
    query: deleteAlbum,
    variables: { input: { id: props.id } },
  })
    .then((result) => {
      console.log('delete album result',result);
      this.albums.splice(index, 1);
      router.push('/album');
    })
    .catch((error) => {
      console.log('delete album error', error);
  });

  //テーブルから画像を削除
  for (let photo of props.photos) {
    console.log('delete pohot', photo);
    API.graphql({
      query: deletePhoto,
      variables: { input: { id: photo.id } },
    })
      .then((result) => {
        console.log('delete photo result',result);
      })
      .catch((error) => {
        console.log('delete photo error', error);
    });
    // ストレージから画像を削除
    try {
      await remove({ 
        path: photo.s3key,
      });
    } catch (error) {
      console.log('Error ', error);
    }
  }
}
</script>