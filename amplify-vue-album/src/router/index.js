import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/components/pages/SignIn.vue'
import AlbumList from '@/components/pages/AlbumList.vue'
import AlbumPhotoList from '@/components/pages/AlbumPhotoList.vue'

// import store from '@/store/index.js'
// import Auth from '@aws-amplify/auth'

const routes = [
  { path: '/', component: SignIn },
  { path: '/SignIn', component: SignIn },
  { path: '/album', component: AlbumList },
  { path: '/album/:albumId', component: AlbumPhotoList },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
