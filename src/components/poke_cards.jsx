import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokemonImage from './pokemonImage';

export default function PokeCards ({ col = 5 }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [flavorTexts, setFlavorTexts] = useState({}); // { [pokeID]: flavorText }
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pokeCount, setPokeCount] = useState(0);

    const pokeLimitOptions = [10, 25, 50, 100];
    if (pokeCount > 100) {
        pokeLimitOptions.push(pokeCount);
    }

    const [limit, setLimit] = useState(pokeLimitOptions[0]);
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

    // Fetch the list of Pokémon
    const fetchPokemon = () => {
        fetch(pokeURL)
            .then((res) => res.json())
            .then((data) => {
                setPokemonList(data.results);
                setPokeCount(data.count);

    // For each Pokémon, fetch its flavor text
    data.results.forEach((pokemon) => {
    const urlParts = pokemon.url.split('/');
    const pokeID = Number(urlParts[urlParts.length - 2]);

     fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`)
    .then(res => res.json())
    .then(speciesData => {
    const entry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
    );
    const text = entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : 'No description available.';
    setFlavorTexts((prev) => ({ ...prev, [pokeID]: text }));
                        })
                        .catch(err => {
                            console.error('Error fetching flavor text:', err);
                            setFlavorTexts((prev) => ({ ...prev, [pokeID]: 'No description available.' }));
                        });
                });
            });
    };

    useEffect(() => {
        const newOffset = (currentPage - 1) * limit;
        setOffset(newOffset);
    }, [currentPage, limit]);

    useEffect(() => {
        fetchPokemon();
    }, [offset, limit]);

    const pageNumberDropDown = () => {
    const numberOfPages = Math.ceil(pokeCount / limit);
    return (
        <div>
            <div>
                <label htmlFor="pageNumbers">Page:</label>
                <select
                    name="pageNumbers"
                    id="pageNumbers"
                    className="select select-bordered"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                >
                    {Array.from({ length: numberOfPages }, (_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="itemsPerPage" className="mr-2">
                    Items per page:
                </label>
                <select
                    name="itemsPerPage"
                    id="itemsPerPage"
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="select select-bordered"
                >
                    {pokeLimitOptions.map((optionValue) => (
                        <option key={optionValue} value={optionValue}>
                            {optionValue}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};


    return (
        <div>
            {pageNumberDropDown()}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pokemonList.map((pokemon) => {
                    const urlParts = pokemon.url.split('/');
                    const pokeID = Number(urlParts[urlParts.length - 2]);
                    const pokeLinkUrl = `/pokemon/${pokeID}`;

                    return (
                        <Link to={pokeLinkUrl} key={pokeID} className='w-36 col-span-1'>
                            <div className="card shadow-sm flex flex-col items-center p-2">
                                <figure className="w-full flex justify-center items-center h-32 bg-white">
                                    <PokemonImage pokeID={pokeID} className="w-full h-full object-contain" />
                                </figure>

                                <h2 className='card-title text-center capitalize'>{pokemon.name}</h2>

                                {/* Display flavor text here */}
                                <p className="text-xs italic mt-1 white text-center">
                                    {flavorTexts[pokeID] || 'Loading description...'}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
