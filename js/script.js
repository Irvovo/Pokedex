const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonSprite = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const send = (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

    input.value = ''
    
}
const buttonNext = document.querySelector('.btn-next');
const buttonPrev = document.querySelector('.btn-prev');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;}
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if(data){
    pokemonSprite.style.display = 'block'    
    pokemonName.innerHTML = data['name'];
    pokemonId.innerHTML = data['id'];
    pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
    } else{
        pokemonSprite.style.display = 'none';
        pokemonName.innerHTML = 'Não tem T-T';
        pokemonId.innerHTML = '';
    }
}
buttonPrev.addEventListener ('click', ()=> {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
}
}  
)
buttonNext.addEventListener ('click', ()=> {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
}  
)




renderPokemon (searchPokemon);




