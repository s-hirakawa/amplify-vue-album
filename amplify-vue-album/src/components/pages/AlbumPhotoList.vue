<template>
  <BaseLayout>
    <v-container>
      <v-row>
        <AlbumListHeader
          :id="album.id"
          :name="album.name"
          :photos="album.photos"
          :is-album-name-link="false"
          show-detail-controller
        />
        <AlbumListItem
          :id="album.id"
          :name="album.name"
          :photos="album.photos"
          :isAlbumNameLink="false"
          show-detail-controller
          @register-photo="hundleOpenDialog"
        />
      </v-row>
    </v-container>
    <RegisterPhoto
      ref="registerRef"
      :album-name="album.name"
      is-edit-album-name="false"
    />
  </BaseLayout>
</template>

<script setup lang="js">
import { ref, computed, onMounted, watch } from "vue"
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import BaseLayout from "@/components/templates/BaseLayout.vue";
import AlbumListItem from "@/components/organisms/AlbumListItem.vue";
import RegisterPhoto from "@/components/organisms/RegisterPhoto.vue";
import AlbumListHeader from "../organisms/AlbumListHeader.vue";

const route = useRoute()
const store = useStore()
const registerRef = ref(null)
const albumId = ref(route.params.albumId)

onMounted(() => {
  // store.dispatch('albums/fetchAlbums')
})

watch(() => route.params.id, (newId) => albumId.value = newId)

const album = computed(() => {
  return store.getters['albums/getAllAlbum']({ id: albumId.value })
})

const hundleOpenDialog = () => {
  registerRef.value.openRegisterDialog()
}
</script>