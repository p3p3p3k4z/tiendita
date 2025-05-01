import { PokemonsReponse, SimplePokemon } from "@/app/pokemons";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import Image from 'next/image';
const respuesta = async (limit =5, offset = 0):Promise<SimplePokemon[]> => {
    //console.log(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data: PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())

    const pokemons = data.results.map(       
       pokemon => ({
            id: pokemon.url.split('/').at(-2)!,
            name: pokemon.name
        })
    );
    return pokemons;
}


export default async function PokemonsPage(){
    const lista = await respuesta(55)
    //console.log(lista.results);

    return (
        <div>
            <div className='flex flex-column'>
              <div className="flex flex-wrap gap-10 items-center justify-center">

              {
                lista.map((pokemon) => (                  
                  <div key={pokemon.id} className="flex flex-col items-center">
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      width={120}
                      height={120}
                      alt = {pokemon.name}
                    />
                    <span >

                      <a href={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`}>{pokemon.name}</a>
                    </span>
                  </div>
                ))

              }
                  
              </div>

            </div>
        </div>
    )
}

/*
Revisar 
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

API de imágenes de pokemons
https://pokeapi.co/
*/


/* 

import { SimplePokemon } from "@/app/pokemons";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const respuesta = async (limit =5, offset = 0)> => {
    console.log(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    return data;
    // return pokemons.results
}


export default async function PokemonsPage(){
    const lista = await respuesta(15)
    console.log(lista.results);

    return (
        <div>
            PokemonsPage

            {
                JSON.stringify(lista)
            }
            <ul>

            {
            lista.results.map((pokemon: { name: string; url: string }) => (
              <li key={pokemon.name}>
                {pokemon.name} <a href={pokemon.url}> Ver más</a>
              </li>
            ))
          }
            </ul>
        </div>
    )
}
*/