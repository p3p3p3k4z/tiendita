# Pokemon v1

```typescript
export default function PokemonPage () {
    return (
      <div>
        <h1>Pokemon Page V1</h1>
      </div>
    );
  };

```


# Pokemon v2

```typescript


const getData = async(limit = 10, offset = 0) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    return data;
}

export default function PokemonPage () {
    return (
      <div>
        <h1>Pokemon Page V1</h1>
      </div>
    );
  };
```

# Respuesta obtenida en la página de Pokemons

```
Pokemon Page V1
{}
```



# Pokemon v3

Agregamos async / await en PokemonPage

```typescript

const getData = async(limit = 10, offset = 0) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    return data;
}

export default async function PokemonPage () {
    const data = await getData();
    console.log(data);
    return (
      <div>
        <h1>Pokemon Page V1</h1>
        { JSON.stringify(data) }
      </div>
    );
  };

```

## Respuesta obtenida en la página de Pokemons

```
Pokemon Page V1
{"count":1302,"next":"https://pokeapi.co/api/v2/pokemon?offset=10&limit=10","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"}]}
```

# Agregando una interface para filtar los datos


Usar el complemento/extensión `paste json as code`

* Como ejemplo, se puede usar: https://pokeapi.co/api/v2/pokemon/1/


### Código de la interfaz `SimplePokemon`

```typescript
export interface SimplePokemon {
    id:   string;
    name: string;
  }
```

### Código de la interfaz `PokemonsReponse`
```typescript
export interface PokemonsReponse {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}
```


# Agregar la interfaz a la función para extraer la información


```typescript
const getData = async(limit = 10, offset = 0) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
 // ...
}
```

### Debe quedar como la siguiente

```typescript
const getData = async(limit = 10, offset = 0):Promise<SimplePokemon[]> => {
    
    const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    return data;
}
```

# Se hace el cambio para que devuelva un arreglo de objetos

```typescript

const getData = async(limit = 10, offset = 0):Promise<SimplePokemon[]> => {
    const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    
    const response = data.results.map( item => ({}) )
}
```


```typescript

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

```



# en PokemonPage

```typescript
return (
      <div>
        <h1>Pokemon Page V1</h1>
             
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${1}.svg`} 
                width = {100}
                height = {120}
                alt = "Pokemon"
            />        
      </div>
    );
```


# Prueba con datos
