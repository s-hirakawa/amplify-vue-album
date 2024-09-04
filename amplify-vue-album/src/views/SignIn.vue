<template>
    <!-- <LinksList /> -->
    <!-- <div >
        <template v-if="auth.route !== 'authenticated'">
            <h1 id="test">サインイン</h1>
        </template>
    </div> -->
    <authenticator>
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}</h1>
            <button @click="signOut">Sign Out</button>
        </template>
    </authenticator>
</template> 

<script setup>
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
// import LinksList from './LinksList.vue';
import { fetchAuthSession } from 'aws-amplify/auth';
import { onMounted } from 'vue';
const auth = useAuthenticator();
onMounted(async () => {
    try {
        const session = await fetchAuthSession();
        console.log(session);
        
    } catch (error) {
        console.log(error);
        
    }
});
console.log('auth', auth);
</script>

<style>
#test {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
