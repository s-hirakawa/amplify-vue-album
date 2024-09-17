// store/modules/albums.js
const state = {
  albums: [
    {
      "id": "demo1",
      "name": "アルバムA",
      "photos": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      "id": "demo5",
      "name": "アルバムE",
      "photos": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
  ]
}

const getters = {
  getAllAlbums: state => state.albums,
  getAllAlbum: (state) => (filterParam) => {
    const album = state.albums.find(album => album.id === filterParam.id)
    return album ?? []
  }
}

const mutations = {
  FETCH_ALBUMS(state, album) {
    console.log('FETCH_ALBUMSalbum',album);
    
    state.albums = album
  },
  ADD_ALBUM(state, album) {
    console.log('ADD_ALBUMalbum',album);
    state.albums.push(album)
  },
  ADD_IMAGE_TO_ALBUM(state, { albumId, image }) {
    const album = state.albums.find(album => album.id === albumId)
    if (album) {
      album.images.push(image)
    }
  }
}

// import { ref } from "vue"
// import { Amplify } from "aws-amplify";
// import { generateClient  } from "aws-amplify/api";
// import { listAlbums } from "../../graphql/queries";
// import config from  '@/aws-exports';

// Amplify.configure(config);
// const API = generateClient ()

const actions = {
  // fetchAlbums() {
  fetchAlbums({ commit }, album) {
  //   const albumlist = ref(null)
  //   const all_albumlist = ref(null)
  //   // TODO album情報の取得処理
  //   //　アルバム一覧の取得
  //   async function getAlbumList() {
  //   console.log('Is_user_id',store.getters['user/getUserInfo'].id);
  //   await API.graphql({ query: listAlbums })
  //     .then((result) => {
  //       console.log('result',result);
  //       albumlist.value = result.data.listAlbums.items
        
  //       // 取得したアルバムIDから詳細を取得
  //       for(let albumindex in albumlist.value){
  //         console.log('albumlist_id',albumlist.value[albumindex].id);
  //         getAlbuminfo(albumlist.value[albumindex].id)
  //       }
  //       store.dispatch(
  //         'albums/createAlbum',
  //         { id: albumlist[0].id, name: albumlist[0].name, photos: []}
  //       )
  //     })
  //     .catch((error) => {
  //       console.log('error',error);
  //     });
  //     console.log('store.getters[albums/getAllAlbums]', store.getters['albums/getAllAlbums']);
    // }

    // // アルバム詳細の取得
    // async function getAlbuminfo(albumId) {
    // await API.graphql({ query: getAlbum, variables: { id: albumId }})
    //   .then((result) => {
    //     console.log('getAlbuminfo result',result);
    //     store.dispatch(
    //       'albums/createAlbum',
    //       { id: result.data.getAlbum.id, name: result.data.getAlbum.name, photos: [1]}//result.data.getAlbum.photos}
    //     )
    //   })
    //   .catch((error) => {
    //     console.log('error',error);
    //   });
    // }
    commit('FETCH_ALBUMS', album)
  },
  createAlbum({ commit }, album) {
    commit('ADD_ALBUM', album)
  },
  addImageToAlbum({ commit }, payload) {
    commit('ADD_IMAGE_TO_ALBUM', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
