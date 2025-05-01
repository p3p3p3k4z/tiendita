import Image from 'next/image';

import { PokemonsReponse, SimplePokemon } from "@/app/pokemons";

const getData = async (limit = 251, offset = 0): Promise<SimplePokemon[]> => {
    const data: PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => response.json());

    const response = data.results.map(item => ({
        id: item.url.split('/').at(-2)!,
        name: item.name
    }));
    return response;
}

export default async function PokemonPage() {
    const data = await getData();
    console.log(data);

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold my-6">Pokemon Page V1</h1>

            {/* Mapeo de los Pokémon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map(pokemon => (
                    <div key={pokemon.id} className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl w-72">
                        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                width={200}
                                height={200}
                                alt={pokemon.name}
                                className="mx-auto mb-4"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                This is a Pokémon named {pokemon.name}. It’s known for its unique abilities.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
