<template>
    <article class="movie-preview">
        <div class="img-container">
            <img :src="movie.posterUrl" :alt="movie.title" @error="handleImageError" />
        </div>
        <div class="content">
            <h3>{{ movie.title }}</h3>
            <p class="year">Year: {{ movie.releaseYear }}</p>

            <div class="actions">
                <button class="btn" @click="onDetails">Details</button>
                <button class="btn" @click="onEdit">Edit</button>
                <button class="btn danger" @click="onRemove">Delete</button>
            </div>
        </div>
    </article>
</template>

<script>
import defaultImg from '@/assets/images/default.png'
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleImageError(e) {
            e.target.src = defaultImg
        },
        onRemove() {
            console.log('Removing movie with ID:', this.movie._id);
            this.$emit('remove', this.movie._id)
        },
        onDetails() {
            this.$router.push(`/movie/${this.movie._id}`)
        },
        onEdit() {
            this.$router.push(`/movie/edit/${this.movie._id}`)
        }
    }
}
</script>

<style scoped>
.movie-preview {
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
}

.img-container {
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.movie-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.movie-preview:hover img {
    transform: scale(1.05);
}

.content {
    padding: 10px;
    text-align: center;
}

.content h3 {
    margin: 0 0 10px 0;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    min-height: 2.4em;
    line-height: 1.2em;
}

.year {
    color: #666;
    margin-bottom: 10px;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: auto;
}

button.danger {
    background-color: #ff4d4f;
    color: white;
    border: none;
}
</style>