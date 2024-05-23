const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const separator = document.querySelector(".separator");
const stats_name = document.querySelector(".stats_name");
const stats_number = document.querySelector(".stats_number");
const stats_weight = document.querySelector(".stats_weight");
const stats_height = document.querySelector(".stats_height");
const stats_health = document.querySelector(".stats_health");
const stats_atack = document.querySelector(".stats_atack");
const stats_defense = document.querySelector(".stats_defense");
const stats_speed = document.querySelector(".stats_speed");

let searchPokemon = 143;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando . . .";
  separator.innerHTML = "";
  pokemonNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    const image = await data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];

    if(image === null){
      pokemonImage.src = "../images/imageNotFound.png" 
    }else{
      pokemonImage.src =image
    }
      stats_name.innerHTML = pokemonName.innerHTML;
      separator.innerHTML = "-";
      stats_number.innerHTML = pokemonNumber.innerHTML
      stats_weight.innerHTML = data.weight
      stats_height.innerHTML = data.height
      stats_health.innerHTML = data.stats[0].base_stat
      stats_atack.innerHTML = data.stats[1].base_stat
      stats_defense.innerHTML = data.stats[2].base_stat
      stats_speed.innerHTML = data.stats[5].base_stat
      searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Não Encontrado";
    separator.innerHTML = "";
    pokemonImage.src = "../images/pokemonSad.gif";
    pokemonNumber.innerHTML = "";
  }
  input.value = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if(pokemonName.innerHTML === 'Não Encontrado') renderPokemon(1)
  if (searchPokemon >= 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  if(pokemonName.innerHTML === 'Não Encontrado') renderPokemon(1)
  if (searchPokemon >= 1) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
