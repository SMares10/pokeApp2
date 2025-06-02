import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router';



export default function Pokemon() {
    const [pokemonData, setPokemonData] = useState([]);
    const { pokeID } = useParams();

const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setPokemonData(data)
    })
}    


    return (
        <div>
            
        </div>
    )
}