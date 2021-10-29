import { useState, useEffect } from "react";
import ThumbNail from "./ThumbNail";

const Pokedex = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [loadmore, setLoadmore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=30"
  );
  const { id } = props;

  async function fetchAllPokemons() {
    const res = await fetch(loadmore);
    const json = await res.json();

    setLoadmore(json.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const json = await res.json();

        //spread out the current array and push the new json in the array
        setPokemons((currentList) => [...currentList, json]);
      });
    }
    createPokemonObject(json.results);
    await console.log(pokemons);
  }

  useEffect(() => {
    fetchAllPokemons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="pokemon-container">
        <div className="all-container" Link to={`/${id}`}>
          {pokemons.map((pokemon, index) => (
            <ThumbNail
              id={pokemon.id}
              image={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
      </div>

      <button className="load-more" onClick={() => fetchAllPokemons()}>
        More
      </button>
    </div>
  );
};

export default Pokedex;
