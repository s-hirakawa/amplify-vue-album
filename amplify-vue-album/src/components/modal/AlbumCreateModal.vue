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

            <!-- <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                auto-select-first
                multiple
              ></v-autocomplete>
            </v-col> -->
              <v-col
              cols="12"
              >
              <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              label="images"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Amplify } from "aws-amplify";
import { generateClient  } from "aws-amplify/api";
import { createAlbum } from "../../graphql/mutations";
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

  }),
  methods: {
    async submit(){
      console.log('push submit');
      console.log('this.Albumname',this.Albumname);
      const input = {
        userId: this.store.getters['user/getUserInfo'].id,
        name: this.Albumname,
      }
      console.log('input',input);
      await API.graphql({
      query: createAlbum,
      variables: { input },
    })
      .then((result) => {
        console.log('result',result);
        console.log('result',result.data.createAlbum.id);
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
        console.log('error',error);
      });
    }
  },
}
</script>
