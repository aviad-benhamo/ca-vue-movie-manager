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
    getDefaultFilter,
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
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY

    if (!API_KEY) {
        console.warn('OMDB API key is missing. Please set VITE_OMDB_API_KEY in your local environment (.env).')
        return '../../default.png'
    }

    try {
        const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`)
        if (!res.ok) {
            throw new Error(`OMDB API fetch returned status: ${res.status}`)
        }
        const data = await res.json()

        if (data.Response === 'True') {
            return data.Poster
        } else {
            console.warn(`OMDB API warning for movie "${title}":`, data.Error)
            return '../../default.png'
        }
    } catch (err) {
        console.error('Failed to fetch movie poster:', err)
        return '../../default.png'
    }
}

function _createMovies() {
    var movies = loadFromStorage(KEY)
    if (movies && movies.length) return

    saveToStorage(KEY, demoData)
}

function getDefaultFilter() {
    return { txt: '', maxRunTime: 200 }
}