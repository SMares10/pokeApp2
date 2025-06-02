import { useState, useEffect } from 'react';



export default function PokeCards () {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const [limit, setLimit] = useState(20);
    const offsetCalc = (currentPage - 1) * limit;
    const [offset, setOffset] = useState(0);


    const pokeURL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    
    const fetchPokemon = () => {
        fetch(pokeURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log('Data', data.results);
        setPokemonList(data.results);
    })
    }

    useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    setOffset(newOffset);
  }, [currentPage, limit]);

    useEffect(() => {
        fetchPokemon();
    }, [offset, limit])

    


    return (
        <div>
            {pokemonList.map((pokemon, index) => {
                let pokeID = (index + offset) + 1
                return (
                <div className='card w-36 shadow-sm' key={index}>
                    <figure>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`} alt='image'/>
                    </figure>
                    <h2 className='card-title'>{pokemon.name}</h2>
                </div>
                )
            })}
        </div>
    )
}