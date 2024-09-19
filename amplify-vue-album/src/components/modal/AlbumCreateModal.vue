<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="Album"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-book-edit" title="Album Info">
        <v-card-text color="surface-variant">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Album name*"
                v-model="Albumname"
                required
              ></v-text-field>
            </v-col>

              <v-col cols="12">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                label="images"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                @change="onFileChange"
                counter
                multiple
                show-size
              ></v-file-input>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="登録"
            variant="tonal"
            @click="submit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { Amplify } from "aws-amplify";
import { uploadData } from 'aws-amplify/storage';
import { generateClient  } from "aws-amplify/api";
import { createAlbum ,createPhoto} from "../../graphql/mutations";
import config from  '@/aws-exports';

Amplify.configure(config);
const API = generateClient ()

async function CloseModal() {
  console.log('push CloseModal');
  
  // this.dialog = false

  }
  export default {
    data: () => ({
      CloseModal,
      dialog: false,
      Albumname: '',
      albumId:'',
      store : useStore(),
      s3key: "",
      image: null,
      
    }),
    methods: {
      onFileChange(e) {
        this.image = e.target.files;
      },
      async submit(){
        console.log('push submit');
        console.log('this.Albumname',this.Albumname);

        const input = {
          userId: this.store.getters['user/getUserInfo'].id,
          name: this.Albumname,
        }
        console.log('input',input);

        // アルバムの作成
        await API.graphql({
          query: createAlbum,
          variables: { input },
          })
          .then((result) => {
            console.log('createAlbum result',result);
            this.albumId = result.data.createAlbum.id
            console.log(this.albumId);
            // storeにアルバムを追加
            this.store.dispatch(
            'albums/createAlbum',
            { id: this.albumId, name: this.Albumname, photos: [1]}
          )
            // this.$router.push({ name: "AlbumIndex" });
          })
          .catch((error) => {
            console.log('createAlbum error',error);
        });
        
        //imeageがUPされていれば実行
        if (this.image) {
          console.log('写真登録あり');
          for (let img of this.image) {
            const s3key = new Date().getTime().toString(16) + img.name;
            // 写真のアップロード
            try {
              const result = await uploadData({
                path: s3key, 
                data: img,
              }).result;
                console.log('uploadData Succeeded: ', result);
              } catch (error) {
                console.log('uploadData Error : ', error);
              }
            const input = {
              albumID: this.albumId,
              name: img.name,
              s3key : s3key,
            }
            // 写真テーブルの追加
            await API.graphql({
              query: createPhoto,
              variables: { input },
              }).then((result) => {
                console.log('createPhot result',result);
              }).catch((error) => {
                console.log('createPhot error',error);
            });
          }
        }
        else {
          console.log('写真登録なし');
        }


    }
  },
}
</script>
