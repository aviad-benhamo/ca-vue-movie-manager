<template>
    <ul class="movie-list">
        <li v-for="movie in movies" :key="movie._id">
            <MoviePreview :movie="movie" />
        </li>
    </ul>
</template>

<script>
import MoviePreview from './MoviePreview.vue';

export default {
    props: {
        movies: {
            type: Array,
            required: true
        }
    },
    components: {
        MoviePreview
    }
}
</script>

<style>
.movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    list-style: none;
    padding: 0;
}
</style>