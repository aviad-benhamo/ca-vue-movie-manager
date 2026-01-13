<template>
    <AppHeader />
    <UserMsg />
    <RouterView />
    <AppFooter />

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
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


<style scoped></style>
