import React, { Component } from "react";
import Pokedex from "./Pokedex";

class Pokemon extends Component {
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.props.match.params}/`
    );

    const json = await res.json();

    this.setState({
      loading: false,
      name: json.pokemons[0].name,
      id: json.pokemons[0].id,
      image: json.pokemons[0].sprites,
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading..</h2>;
    }
    const { name, id, image } = this.state;

    return (
      <div className="all-container">
        <Pokedex pokemons={image} />
        <h2> {name} </h2>
        <h2> {id} </h2>
      </div>
    );
  }
}

export default Pokemon;
