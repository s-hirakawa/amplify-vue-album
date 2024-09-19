<template>
  <CustomDialog ref="dialogPhotoRef">
    <template v-slot:title>Photo Registration</template>
    <template v-slot:content>
      <v-text-field
        v-model="inputAlbumName"
        label="Album Name"
        :disabled="isEditAlbumName"
      />
      
    </template>
    <template v-slot:action>
      <v-btn color="teal-darken-3" variant="outlined" @click="registerImage">Register</v-btn>
    </template>
  </CustomDialog>
  <CustomSnackBar ref="messageSnackbar"/>
</template>

<script setup lang="js">
import { ref, defineProps, defineExpose } from "vue"
import CustomDialog from "../organisms/CustomDialog.vue";
import CustomSnackBar from "../organisms/CustomSnackBar.vue";

const props = defineProps({
  isEditAlbumName: {
    type: Boolean,
    default: false
  },
  albumName: {
    type: String,
    default: ""
  }
})

const demo = require('@/assets/upload.svg') 
const file = ref(null)
const img = ref(demo)
const inputAlbumName = ref(props.albumName)
const showMessage = ref(false)
const messageSnackbar = ref(null)
const dialogPhotoRef = ref(null)

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
  dialogPhotoRef.value.closeDialog()
}

const openRegisterDialog = () => {
  dialogPhotoRef.value.openDialog();
}

defineExpose({openRegisterDialog})
</script>