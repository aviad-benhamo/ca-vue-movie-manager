<template>
    <section class="movie-index">
        <h2>Movies List</h2>
        <MovieList v-if="movies.length" :movies="movies" @remove="removeMovie" />
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
        },
        async removeMovie(movieId) {
            try {
                await movieService.remove(movieId)

                const idx = this.movies.findIndex(movie => movie._id === movieId)
                this.movies.splice(idx, 1)

                console.log('Movie removed!')
            } catch (err) {
                console.log('Cannot remove movie', err)
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