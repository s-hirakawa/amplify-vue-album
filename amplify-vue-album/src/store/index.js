import { createStore } from 'vuex'
import user from './modules/user'
import albums from './modules/albums'
import showstate from './modules/showState'

const store = createStore({
  modules: {
    user,
    albums,
    showstate
  }
})

// 使い方のデモ
// ログイン情報を更新
// store.dispatch(
//   'user/login',
//   { id: 1, name: 'John Doe', email: 'john@example.com', token: 'abc123' }
// )
// アルバムに画像を追加
// store.dispatch(
//   'albums/addImageToAlbum',
//   { albumId: 1, image: { id: 101, url: 'image-url' } }
// )

export default store
