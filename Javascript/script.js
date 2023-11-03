
const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemon_count; i++) {
		await getPokemon(i)
	}
}

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const data = await res.json()
	createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
	const card = document.createElement('div');
	card.classList.add('pokemon');
	card.style.backgroundColor = colors[pokemon.types[0].type.name];

	const spriteContainer = document.createElement('div');
	spriteContainer.classList.add('img-container')

	const sprite = document.createElement('img');
	sprite.src = pokemon.sprites.front_default;
	sprite.alt = pokemon.name;
	spriteContainer.appendChild(sprite);

	const info = document.createElement('div');
	info.classList.add('info');

	const number = document.createElement('span');
	number.classList.add('number');
	number.textContent = `${pokemon.id.toString().padStart(3, 0)}`;
	info.appendChild(number);

	const name = document.createElement('h3');
	name.classList.add('name');
	name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
	info.appendChild(name);

	const type = document.createElement('small');
	type.classList.add('type');
	type.textContent = `Type: ${pokemon.types[0].type.name}`;

	info.appendChild(type);

	card.appendChild(spriteContainer);
	card.appendChild(info);

	poke_container.appendChild(card);
}

fetchPokemons();