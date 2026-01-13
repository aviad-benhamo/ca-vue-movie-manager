import { storageService } from './async-storage.service.js'
import { loadFromStorage, saveToStorage } from './util.service.js'

import demoData from '../assets/data/movie.data.js'

const KEY = 'movies'

_createMovies()

export const movieService = {
    query,
    get,
    remove,
    save,
    getEmptyMovie,
    getMoviePoster,
}

async function query(filterBy = {}) {
    var movies = await storageService.query(KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        movies =
            movies.filter(movie =>
                regex.test(movie.title) ||
                regex.test(movie.director) ||
                movie.actors.some(actor => regex.test(actor)))
    }

    if (filterBy.maxRunTime) {
        movies = movies.filter(movie => movie.runningTime <= filterBy.maxRunTime)
    }
    return movies
}

async function get(movieId) {
    return storageService.get(KEY, movieId)
}

async function remove(movieId) {
    return storageService.remove(KEY, movieId)
}

async function save(movie) {
    if (movie._id) return storageService.put(KEY, movie)
    else return storageService.post(KEY, movie)
}

function getEmptyMovie() {
    return {
        title: 'New Movie',
        director: '',
        posterUrl: '',
        runningTime: 100,
        releaseYear: new Date().getFullYear(),
        actors: [],
        genre: 'General',
    }
}

async function getMoviePoster(title) {
    const API_KEY = 'c286babf'

    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`)
    const data = await res.json()

    if (data.Response === 'True') {
        return data.Poster // Use this in your UI
    } else {
        return '../../default.png'
    }
}

function _createMovies() {
    var movies = loadFromStorage(KEY)
    if (movies && movies.length) return

    saveToStorage(KEY, demoData)
}
