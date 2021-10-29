import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ThumbNail from "./ThumbNail";

class Pokemon extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}/`
    );

    const json = await res.json();

    this.setState({
      loading: false,
      name: json.name,
      image: json.sprites.other.dream_world.front_default,
      id: json.id,
      type: json.types[0].type.name,
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading..</h2>;
    }
    const { name, image, id, type } = this.state;

    return (
      <div className="all-container">
        <ThumbNail name={name} id={id} image={image} type={type} />
      </div>
    );
  }
}

export default withRouter(Pokemon);
