<template>
    <v-list>
        <v-list-item v-for="link in dispLinks" :key="link.title" :title="link.title" :to="link.to"></v-list-item>
    </v-list>
</template>

<script setup>
import { ref } from 'vue';

const Links = [
    { title: 'signin', to: '/SignIn' },
    { title: 'albums', to: '/Albums' },
    { title: 'albums create', to: '/Albums/create' },
];

const dispLinks = ref(Links)
</script>