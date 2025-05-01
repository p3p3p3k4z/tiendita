import Image from 'next/image';

import { PokemonsReponse, SimplePokemon } from "@/app/pokemons";

const getData = async(limit = 10, offset = 0):Promise<SimplePokemon[]> => {
    const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    
    const response = data.results.map( item => ({
        id: item.url.split('/').at(-2)!,
        name: item.name
    }) )
    return response;
}

export default async function PokemonPage () {
    const data = await getData();
    console.log(data);
    return (
      <div>
        <h1>Pokemon Page V1</h1>
        { 
         //JSON.stringify(data) 
        }

        
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${1}.svg`} 
                width = {100}
                height = {120}
                alt = "Pokemon"
            />

        
      </div>
    );
  };
