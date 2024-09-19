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
  fetchAlbums({ commit }, album) {
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
