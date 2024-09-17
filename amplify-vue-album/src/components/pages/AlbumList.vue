<template>
  <BaseLayout>
    <v-btn @click="change_name" to="/signin">change_name</v-btn>
    <AlbumCreateModal></AlbumCreateModal>
    <v-container>
      <v-row>
        <template v-for="album in albums" :key="album.name">
          <AlbumListHeader :id="album.id" :name="album.name"/>
          <AlbumListItem
            :id="album.id"
            :name="album.name"
            :photos="album.photos.slice(0, 10)"
            @register-photo="hundleRegisterPhoto"
          />
        </template>
      </v-row>
    </v-container>
    <CustomDialog ref="dialogRef">
      <template v-slot:title>Photo Registration</template>
      <template v-slot:content>
        <v-text-field label="Album Name" />
        <v-img :src="img" max-width="100%" @dragover.prevent @drop="dropFile" />
        <v-file-input
          v-model="file"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          hide-input
          style="display: none;"
        />
      </template>
      <template v-slot:action>
        <v-btn color="teal-darken-3" variant="outlined" @click="registerImage">Register</v-btn>
      </template>
    </CustomDialog>
    <CustomSnackBar ref="messageSnackbar"/>
  </BaseLayout>
</template>

<script setup lang="js">
import { useStore } from 'vuex'
import { ref, computed, onMounted } from "vue"

import BaseLayout from "@/components/templates/BaseLayout.vue";
import AlbumListItem from "@/components/organisms/AlbumListItem.vue";
import CustomDialog from "@/components/organisms/CustomDialog.vue";
import CustomSnackBar from "@/components/organisms/CustomSnackBar.vue";
import AlbumListHeader from "@/components/organisms/AlbumListHeader.vue";

import AlbumCreateModal from "@/components/modal/AlbumCreateModal.vue";

import { Amplify } from "aws-amplify";
import { generateClient  } from "aws-amplify/api";
import { listAlbums, getAlbum } from "../../graphql/queries";
import config from  '@/aws-exports';
Amplify.configure(config);
const API = generateClient ()


const demo = require('@/assets/upload.svg') 
const showMessage = ref(false)
const file = ref(null)
const img = ref(demo)

// Dialogコンポーネントへのref
const dialogRef = ref(null)
const messageSnackbar = ref(null)

const store = useStore()

const albumlist = ref(null)
const allalbumlist = ref([])
onMounted(() => {
  getAlbumList()
  allalbumlist.value = []
  console.log('allalbumlist',allalbumlist)
  console.log('allalbumlist',allalbumlist.value)
  console.log('allalbumlist',allalbumlist.value[0])
  store.dispatch(
    'albums/fetchAlbums',allalbumlist.value
  )
})

//　アルバム一覧の取得
async function getAlbumList() {
  console.log('Is_user_id',store.getters['user/getUserInfo'].id);
  await API.graphql({ query: listAlbums })
    .then((result) => {
      albumlist.value = result.data.listAlbums.items
      // 取得したアルバムIDから詳細を取得居
      for(let albumindex in albumlist.value){
        console.log('albumlist_id',albumlist.value[albumindex].id);
        getAlbuminfo(albumlist.value[albumindex].id)
      }
    })
    .catch((error) => { console.log('error',error); });
  }

  // アルバム詳細の取得
  async function getAlbuminfo( albumId) {
  await API.graphql({ query: getAlbum, variables: { id: albumId }})
    .then((result) => {
      console.log('getAlbuminfo result',result);
      allalbumlist.value.push({ id: result.data.getAlbum.id, name: result.data.getAlbum.name, photos: [1]})//result.data.getAlbum.photos})
      // if (albumindex==0) {
      //   store.dispatch(
      //     'albums/fetchAlbums',
      //     { id: result.data.getAlbum.id, name: result.data.getAlbum.name, photos: [1]}//result.data.getAlbum.photos}
      //   )
      // }
      // else {
      //   // allalbumlist.value.push(result.data.getAlbum)
      //   store.dispatch(
      //     'albums/createAlbum',
      //     { id: result.data.getAlbum.id, name: result.data.getAlbum.name, photos: [1]}//result.data.getAlbum.photos}
      //   )
      // }
    })
    .catch((error) => {
      console.log('error',error);
    });
  }

const albums = computed(() => store.getters['albums/getAllAlbums'])

const hundleRegisterPhoto = () => {
  console.log("DEMO");
  dialogRef.value.openDialog()
}

const dropFile = (event) => {
  event.preventDefault()
  console.log("dropFile.");

const droppedFiles = event.dataTransfer.files
if (droppedFiles.length) {
  file.value = droppedFiles[0] // 最初のファイルを v-file-input に設定
  img.value = URL.createObjectURL(droppedFiles[0]) // 画像をプレビュー
}
}

const registerImage = () => {
  console.log("registerImage");
  showMessage.value = true
  // TODO: 登録処理

  messageSnackbar.value.openSnackBar(
    "Photo regster success.", "success"
  )
  dialogRef.value.closeDialog()
}


const change_name = () => {
  console.log("push change_name");

  store.dispatch(
    'user/login',
    { id: 1, name: 'John Doe', email: 'john@example.com', token: 'abc123' }
)
}
</script>

