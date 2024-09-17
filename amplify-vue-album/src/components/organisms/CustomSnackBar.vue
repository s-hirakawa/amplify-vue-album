<template>
  <v-snackbar
    v-model="showMessage"
    :timeout="2000"
    :color="snackColor"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup lang="js">
import { ref, defineExpose } from 'vue';
const snackColor = ref("deep-purple-accent-4")
const showMessage = ref(false)
const message = ref(false)

const openSnackBar = (msg, color) => {
  snackColor.value = color
  message.value = msg
  showMessage.value = true
}

defineExpose({openSnackBar})
</script>