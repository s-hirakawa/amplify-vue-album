
<template>
  <v-row class="mt-5">
    <v-card v-for="photo in props.photos" :key="`${props.name}-${photo}`" width="15%" class="mx-5 my-2">
      <v-sheet height="150">{{photo.s3key}}</v-sheet>
      <!-- <h1>test</h1>
      <v-img
        :width="100"
        aspect-ratio="16/9"
        cover
        v-bind:src="generateS3Url(photo.s3key)"
      ></v-img> -->
      <v-checkbox v-if="showCheckBox" class="position-absolute bottom-0 right-0"></v-checkbox>
    </v-card>
  </v-row>
</template>

<script setup lang="js">
import { useStore } from 'vuex'
import { computed ,defineProps , ref} from 'vue';

const store = useStore()

const showCheckBox = computed(() => {
  console.log('store.getters[getState]', store.getters['getState']);
  return store.getters['getState']
})

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photos: {
    type: Array,
    required: true
  },
  isAlbumNameLink: {
    type: Boolean,
    default: true
  },
  showDetailController: {
    type: Boolean,
    default: false
  }
})

function generateS3Url(s3key) {
  const bucketName = 'amplify-vue-album6167e-dev';
  const region = 'ap-northeast-1';

  return `https://${bucketName}.s3.${region}.amazonaws.com/${s3key}`;
}


</script>

<script lang="js">
import config from  '@/aws-exports';
import { Amplify } from "aws-amplify";
import { generateClient  } from "aws-amplify/api";
// import { downloadData } from 'aws-amplify/storage';

Amplify.configure(config);
const API = generateClient ()
// const linkToStorageFile = await downloadData({
//   path: '19203f66a1cスクリーンショット (1).png'
//   // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
// }).result;
// console.log('signed URL: ', linkToStorageFile);
// console.log('URL expires at: ', linkToStorageFile.expiresAt);
</script>
