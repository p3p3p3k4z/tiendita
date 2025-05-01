import { SimplePokemon } from "../pokemons"

export const PokemonItem = ({id,name} : SimplePokemon) =>{
    return(
        <>
        <div>
        {id}
        <span className="text-4xl bg-cyan-700 rounded-2xl">
            {name}
        </span>
       
        </div>
        </>
    )
}