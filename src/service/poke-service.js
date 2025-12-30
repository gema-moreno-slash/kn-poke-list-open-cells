import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';
const LIMIT = 10;

function getAllPokemon(skip = 0, limit = LIMIT) {
    return axios.get(`${API_URL}pokemon?limit=${limit}&offset=${skip}`);
}

async function getPokemon(name) {
    const response = await fetch(`${API_URL}pokemon/${name}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: Pokémon no encontrado`);
    }
    return response.json();
}


export {
    getAllPokemon,
    getPokemon
}