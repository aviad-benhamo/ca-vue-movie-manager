import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import MovieIndex from '@/pages/MovieIndex.vue'
import MovieDetail from '@/pages/MovieDetail.vue'
import MovieEdit from '@/pages/MovieEdit.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/movie',
            name: 'movie-index',
            component: MovieIndex,
        },
        {
            path: '/movie/:id',
            name: 'movie-detail',
            component: MovieDetail,
        },
        {
            path: '/movie/edit/:id?',
            name: 'movie-edit',
            component: MovieEdit,
        },
    ],
})

export default router