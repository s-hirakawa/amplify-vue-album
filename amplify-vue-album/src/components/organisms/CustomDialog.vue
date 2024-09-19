<!-- UnifiedDialog.vue -->
<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <v-card>
      <v-card-title>
        <slot name="title" />
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <slot name="action" />
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const dialogVisible = ref(false)
const dialogContent = ref('')

// メソッドを他のコンポーネントから呼び出せるように公開する
const openDialog = (content) => {
  console.log('openDialog content',content);
  
  dialogContent.value = content
  dialogVisible.value = true
}
const closeDialog = () => {
  dialogContent.value = ""
  dialogVisible.value = false
}

// 外部に公開
defineExpose({ openDialog, closeDialog })
</script>
