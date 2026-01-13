<template>
    <AppHeader />
    <UserMsg />

    <main class="main-layout">
        <RouterView />
    </main>

    <AppFooter />
</template>

<script>
import { RouterView } from 'vue-router'
import AppHeader from '@/cmps/AppHeader.vue'
import AppFooter from '@/cmps/AppFooter.vue'
import UserMsg from './cmps/UserMsg.vue'

export default {
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
    }
}
</script>

<style scoped>
.main-layout {
    flex-grow: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>