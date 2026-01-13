<template>
    <section class="movie-index">
        <div class="header-actions">
            <h2>Movies List</h2>
            <button @click="onAddMovie" class="primary-btn">Add Movie</button>
        </div>

        <MovieFilter @filter="setFilter" />

        <MovieList v-if="movies.length" :movies="movies" @remove="removeMovie" />
    </section>
</template>

<script>
import { movieService } from '@/services/movie.service.js'
import MovieList from '@/cmps/MovieList.vue'
import MovieFilter from '@/cmps/MovieFilter.vue'

export default {
    data() {
        return {
            movies: [],
            filterBy: {},
        }
    },
    async created() {
        this.filterBy = movieService.getDefaultFilter()
        this.loadMovies()
    },
    methods: {
        async loadMovies() {
            try {
                this.movies = await movieService.query(this.filterBy)
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
        },
        onAddMovie() {
            this.$router.push('/movie/edit')
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            this.loadMovies()
        }
    },
    components: {
        MovieList,
        MovieFilter
    }
}
</script>

<style scoped>
.movie-index {
    padding: 20px;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.primary-btn {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.primary-btn:hover {
    background-color: #3aa876;
}
</style>