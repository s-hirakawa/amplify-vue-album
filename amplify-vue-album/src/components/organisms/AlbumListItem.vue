
<template>
  <v-row class="mt-5">
    <v-card v-for="photo in props.photos" :key="`${props.name}-${photo}`" width="15%" class="mx-5 my-2">
      <v-sheet height="150">{{photo}}</v-sheet>
    </v-card>
  </v-row>
</template>

<script setup lang="js">
import { defineProps } from 'vue';
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

</script>