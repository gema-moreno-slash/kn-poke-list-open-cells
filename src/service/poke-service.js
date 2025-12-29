import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';
const LIMIT = 10;

function getAllPokemon(skip = 0, limit = LIMIT) {
    return axios.get(`${API_URL}pokemon?limit=${limit}&offset=${skip}`);
}

function getPokemon(name) {
    return axios.get(`${API_URL}pokemon/${name}`);
}

export {
    getAllPokemon,
    getPokemon
}