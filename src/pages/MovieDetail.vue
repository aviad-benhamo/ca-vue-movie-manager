<template>
    <section v-if="movie" class="movie-detail">
        <h2>{{ movie.title }}</h2>

        <div class="movie-info">
            <div class="img-container">
                <img :src="movie.posterUrl" :alt="movie.title">
            </div>

            <div class="details">
                <p><strong>Director:</strong> {{ movie.director }}</p>
                <p><strong>Year:</strong> {{ movie.releaseYear }}</p>
                <p><strong>Genre:</strong> {{ movie.genre }}</p>
                <p><strong>Running Time:</strong> {{ movie.runningTime + ' minutes' }}</p>
                <p><strong>Actors list:</strong> {{ movie.actors.join(', ') }}</p>

                <p class="desc">
                    {{ movie.plot || 'No description available for this movie.' }}
                </p>

                <button @click="onBack" class="back-btn">Back to List</button>
            </div>
        </div>
    </section>

    <div v-else class="loading">
        Loading movie details...
    </div>
</template>

<script>
import { movieService } from '@/services/movie.service.js'

export default {
    data() {
        return {
            movie: null
        }
    },
    created() {
        this.loadMovie()
    },
    methods: {
        async loadMovie() {
            const { id } = this.$route.params
            try {
                this.movie = await movieService.get(id)
            } catch (err) {
                console.log('Cannot load movie', err)
                this.$router.push('/movie')
            }
        },
        onBack() {
            this.$router.push('/movie')
        }
    }
}
</script>

<style scoped>
.movie-detail {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.movie-info {
    display: flex;
    gap: 30px;
    margin-top: 20px;
}

.img-container {
    flex: 1;
    max-width: 300px;
}

.img-container img {
    width: 100%;
    border-radius: 5px;
}

.details {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.back-btn {
    align-self: flex-start;
    margin-top: auto;
    padding: 8px 16px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.back-btn:hover {
    background-color: #555;
}

.loading {
    text-align: center;
    margin-top: 50px;
    font-size: 1.2rem;
}

strong {
    color: #555;
    font-weight: 600;
}
</style>