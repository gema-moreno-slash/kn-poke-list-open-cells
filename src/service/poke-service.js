import axios from 'axios';

const { VITE_API_EXT, VITE_API_INT } = import.meta.env;

const LIMIT = 10;

function getListPokemon(skip = 0, limit = LIMIT) {
    return axios.get(`${VITE_API_EXT}pokemon?limit=${limit}&offset=${skip}`);
}

function getListNewPokemon(skip = 0, limit = LIMIT) {
    return axios.get(`${VITE_API_INT}list?limit=${limit}&skip=${skip}`);
}

async function getPokemon(name) {
    const response = await fetch(`${VITE_API_EXT}pokemon/${name}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: Pokémon no encontrado`);
    }
    return response.json();
}

async function getNewPokemon(name) {
    const response = await fetch(`${VITE_API_INT}${name}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: Pokémon no encontrado`);
    }
    return response.json();
}

function createNewPokemon(poke) {
    return axios.post(`${VITE_API_INT}`, poke);
}

export {
    getListPokemon,
    getListNewPokemon,
    getPokemon,
    getNewPokemon,
    createNewPokemon
}