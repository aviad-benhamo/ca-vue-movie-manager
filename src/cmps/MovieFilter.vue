<template>
    <section class="movie-filter">
        <input v-model="filterBy.txt" @input="onSetFilter" type="text" placeholder="Search movie..." />

        <div class="filter-range">
            <label>Max Runtime: {{ filterBy.maxRunTime }} min</label>
            <input v-model.number="filterBy.maxRunTime" @input="onSetFilter" type="range" min="0" max="250" />
        </div>
    </section>
</template>

<script>
import { debounce } from '@/services/util.service.js'

export default {
    data() {
        return {
            filterBy: { txt: '', maxRunTime: 200 }
        }
    },
    created() {
        this.onSetFilter = debounce(() => {
            this.$emit('filter', this.filterBy)
        }, 500)
    }
}
</script>

<style scoped>
.movie-filter {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
}

input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
}

.filter-range {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>