import { useState, useEffect } from "react";
import ThumbNail from "./ThumbNail";

const Pokedex = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [loadmore, setLoadmore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=30"
  );
  const [search, setSearch] = useState("");
  // eslint-disable-next-line
  const [local, setLocal] = useState([]);
  // eslint-disable-next-line
  const [mode, setMode] = useState("Show All");
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
    const LocalKeys = Object.keys(localStorage);
    let i = LocalKeys.length;
    let temp = [];
    while (i--) {
      temp.push({
        name: LocalKeys[i],
        index: localStorage.getItem(LocalKeys[i]),
      });
    }
    setLocal(temp);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMode = (opt) => {
    setMode(opt);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="search-container">
        <div className="search-element">
          <button onClick={() => toggleMode("Show Save")}>Bag</button>
          <button onClick={() => toggleMode("Show Save")}>Show All</button>
        </div>

        <div className="search-element">
          <input
            placeholder="Search Pokemons"
            onChange={handleSearchChange}
            label="Pokemon"
            variant="standard"
          />
        </div>

        <div className="pokemon-container">
          <div className="all-container" Link to={`/${id}`}>
            {pokemons.map(
              (pokemon, index) =>
                pokemons[index].name.includes(search) && (
                  <ThumbNail
                    id={pokemon.id}
                    image={pokemon.sprites.other.dream_world.front_default}
                    name={pokemon.name}
                    type={pokemon.types[0].type.name}
                    key={index}
                  />
                )
            )}
          </div>
        </div>

        <button className="load-more" onClick={() => fetchAllPokemons()}>
          More
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
