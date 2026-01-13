<template>
    <section v-if="movieToEdit" class="movie-edit">
        <h2>{{ movieToEdit._id ? 'Edit Movie' : 'Add Movie' }}</h2>

        <form @submit.prevent="saveMovie" class="movie-form">
            <div class="form-control">
                <label for="title">Title:</label>
                <input v-model="movieToEdit.title" type="text" id="title" required>
            </div>

            <div class="form-control">
                <label for="year">Year:</label>
                <input v-model.number="movieToEdit.releaseYear" type="number" id="year">
            </div>
            <div class="form-control">
                <label for="runningTime">Running Time:</label>
                <input v-model.number="movieToEdit.runningTime" type="number" id="runningTime">
            </div>

            <div class="form-control">
                <label for="director">Director:</label>
                <input v-model="movieToEdit.director" type="text" id="director">
            </div>

            <div class="form-control">
                <label for="genre">Genre:</label>
                <input v-model="movieToEdit.genre" type="text" id="genre">
            </div>

            <div class="form-control">
                <label for="poster">Poster URL:</label>
                <div class="input-group">
                    <input v-model="movieToEdit.posterUrl" type="text" id="poster">
                    <button type="button" @click="onGetPoster" class="secondary-btn">Get Poster</button>
                </div>
            </div>
            <div v-if="movieToEdit.posterUrl" class="poster-preview">
                <img :src="movieToEdit.posterUrl" alt="Poster Preview">
            </div>

            <div class="actions">
                <button type="submit" class="save-btn">Save</button>
                <button type="button" @click="onCancel">Cancel</button>
            </div>
        </form>
    </section>
</template>

<script>
import { movieService } from '@/services/movie.service.js'
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service.js'
export default {
    data() {
        return {
            movieToEdit: null
        }
    },
    created() {
        this.loadMovie()
    },
    methods: {
        async loadMovie() {
            const { id } = this.$route.params
            try {
                if (id) {
                    // Edit mode: load the movie by ID
                    const movie = await movieService.get(id)
                    this.movieToEdit = { ...movie }
                } else {
                    // Add mode: request an empty object from the service
                    this.movieToEdit = movieService.getEmptyMovie()
                }
            } catch (err) {
                console.log('Cannot load movie', err)
            }
        },
        async saveMovie() {
            try {
                await movieService.save(this.movieToEdit)
                showSuccessMsg('Movie saved successfully!')
                // after saving, navigate back to movie list
                this.$router.push('/movie')
            } catch (err) {
                console.log('Cannot save movie', err)
                showErrorMsg('Failed to save movie')
            }
        },
        async onGetPoster() {
            if (!this.movieToEdit.title) return // Need a title to search

            try {
                const posterUrl = await movieService.getMoviePoster(this.movieToEdit.title)
                this.movieToEdit.posterUrl = posterUrl
            } catch (err) {
                console.log('Cannot get poster', err)
                showErrorMsg('Failed to get poster')
            }
        },
        onCancel() {
            this.$router.push('/movie')
        }
    }
}
</script>

<style scoped>
.movie-edit {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.movie-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-control {
    display: flex;
    flex-direction: column;
}

.form-control label {
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.save-btn {
    background-color: #42b983;
    color: white;
}

button[type="button"] {
    background-color: #ccc;
}
</style>