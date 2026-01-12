<template>
    <section class="movie-index">
        <h2>Movies List</h2>
        <MovieList v-if="movies.length" :movies="movies" />
    </section>
</template>

<script>
import { movieService } from '@/services/movie.service.js'
import MovieList from '@/cmps/MovieList.vue'

export default {
    data() {
        return {
            movies: []
        }
    },
    async created() {
        this.loadMovies()
    },
    methods: {
        async loadMovies() {
            try {
                this.movies = await movieService.query()
            } catch (err) {
                console.log('Cannot load movies', err)
            }
        }
    },
    components: {
        MovieList
    }
}
</script>

<style>
.movie-index {
    padding: 20px;
}
</style>