const myOl$$ = document.querySelector("#pokedex");

pokemons = []
const getPokemon = async () => {
    for (i = 1; i<=151; i++) {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
        const pokemon = await res.json();
        pokemons.push(pokemon)
    }
    return pokemons
}

const mapPokemon = (pokemons) => {
    return pokemons.map(pokemon => ({
        number: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types.map((type) => type.type.name).join(", "),
        hp: pokemon.stats[0].base_stat,
        at: pokemon.stats[1].base_stat,
        def: pokemon.stats[2].base_stat,
    }))
}

const drawPokemon = (pokemons) => {
    myOl$$.innerHTML = "";
    for (pokemon of pokemons) {
        let pokemonLi = document.createElement("li");
        pokemonLi.className = "card";
        
        let pokemonNumber = document.createElement("h1");
        pokemonNumber.textContent = "#" + pokemon.number;
        pokemonNumber.className = "card-title";
    
        let pokemonName = document.createElement("h3");
        pokemonName.textContent = pokemon.name;
        pokemonName.className = "card-subtitle";

        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", pokemon.image);
        pokemonImage.setAttribute("alt", pokemon.name);
        pokemonImage.className = "card-image"

        let pokemonStats = document.createElement("div");
        pokemonStats.setAttribute("class", "card-stats");
        let pokemonHP = document.createElement("span");
        pokemonHP.setAttribute("class", "stats-HP");
        pokemonHP.textContent = "HP:" + pokemon.hp;
        let pokemonAT = document.createElement("span");
        pokemonAT.setAttribute("class", "stats-AT");
        pokemonAT.textContent = "AT:" + pokemon.at;
        let pokemonDEF = document.createElement("span");
        pokemonDEF.setAttribute("class", "stats-DEF");
        pokemonDEF.textContent = "DEF:" + pokemon.def;
        pokemonStats.appendChild(pokemonHP);
        pokemonStats.appendChild(pokemonAT);
        pokemonStats.appendChild(pokemonDEF);
    
        let pokemonType = document.createElement("div");
        pokemonType.textContent = pokemon.type;
        pokemonType.className = "card-type";
    
        myOl$$.appendChild(pokemonLi);
        pokemonLi.appendChild(pokemonNumber);
        pokemonLi.appendChild(pokemonName);
        pokemonLi.appendChild(pokemonImage);
        pokemonLi.appendChild(pokemonStats);
        pokemonLi.appendChild(pokemonType);
    }
}

const drawInput = (pokemons) => {
    const input$$ = document.querySelector("input");
    input$$.addEventListener("input", () => 
    searchPokemon(input$$.value, pokemons));
}

searchPokemon = (filtro, array) => {
    let filteredPokemons = array.filter((pokemon) => 
    pokemon.name.toLowerCase().includes(filtro.toLowerCase()))
    drawPokemon(filteredPokemons);
}

const init = async () => {
    const pokemons = await getPokemon();
    const mappedPokemon = mapPokemon(pokemons);
    drawPokemon(mappedPokemon);
    drawInput(mappedPokemon);
}
init()
