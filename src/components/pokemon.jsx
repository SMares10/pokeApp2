import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function Pokemon() {
    const [pokemonData, setPokemonData] = useState(null);
    const [flavorText, setFlavorText] = useState('');
    const { pokeID } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
                const data = await res.json();
                setPokemonData(data);

                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`);
                const speciesData = await speciesRes.json();

                const entry = speciesData.flavor_text_entries.find(
                    (entry) => entry.language.name === 'en'
                );
                if (entry) {
                    setFlavorText(entry.flavor_text.replace(/\n|\f/g, ' '));
                }
            } catch (err) {
                console.error('Error fetching Pokémon:', err);
            }
        };

        fetchPokemon();
    }, [pokeID]);

    if (!pokemonData) {
        return <p>Loading...</p>;
    }

    const { name, id, sprites } = pokemonData;
    const imageUrl =
        sprites?.other?.dream_world?.front_default || sprites?.front_default;

    return (
        <div className="pokemon">
            <h1 className="text-2xl capitalize">{name}</h1>
            <p>ID: {id}</p>
            <img src={imageUrl} alt={name} className="w-48 h-48 object-contain" />
            <p className="mt-4 italic text-gray-700 block">
                {flavorText || 'No description available.'}
            </p>
        </div>
    );
}
