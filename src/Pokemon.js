import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  GoogleMap,
  //eslint-disable-next-line
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

class Pokemon extends Component {
  constructor() {
    super();

    this.state = { loading: true, locations: [], saved: false };
  }

  async componentDidMount() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}/`
    );

    const json = await res.json();

    let saved = false;
    if (localStorage.getItem(json.name)) {
      saved = true;
    }

    this.setState({
      loading: false,
      name: json.name,
      image: json.sprites.other.dream_world.front_default,
      id: json.id,
      type: json.types[0].type.name,
      height: json.height,
      weight: json.weight,
      ability_1: json.abilities[0].ability.name,
      ability_2: json.abilities[1].ability.name,
      url_1: json.abilities[0].ability.url,
      url_2: json.abilities[1].ability.url,
      saved: saved,
      locations: [
        "32.734778,-117.152630",
        "32.734196,-117.139709",
        "32.833744,-117.067149",
        "32.819219,-117.029244",
        "32.907707,-116.797917",
      ],
    });
    /*const result = await fetch(
      `https://api.craft-demo.net/pokemon/${this.props.match.params.id}/`,
      {
        headers: {
          "x-api-key": "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const loc = await result.json();

    this.setState({
      locations: loc.messages,
    });*/
  }
  handleSave = (e) => {
    if (e.target.checked) {
      localStorage.setItem(this.state.name, this.state.id);
      this.setState({ saved: true });
    } else {
      localStorage.removeItem(this.state.name);
      this.setState({ saved: false });
    }
  };

  render() {
    if (this.state.loading) {
      return <h2>loading..</h2>;
    }

    const PokeMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          Zoom={8}
          defaultCenter={{ lat: -34.987, lng: 150.644 }}
        ></GoogleMap>
      ))
    );
    const {
      name,
      image,
      id,
      type,
      height,
      weight,
      ability_1,
      ability_2,
      url_1,
      url_2,
      // eslint-disable-next-line
      locations,
      saved,
    } = this.state;

    return (
      <div className="detail-container">
        <div className="leftdetail-container">
          <img src={image} alt={name} />
          <h3>
            {name} <small>#0{id}</small>{" "}
          </h3>
          <small>Type: {type}</small>
          <br />
          <small>Height: {height}</small> <small>Weight: {weight}</small>
          <div>
            <small>Ability:</small>
            <a href={url_1}>{ability_1}</a>
          </div>
          <div>
            <small>Ability:</small>
            <a href={url_2}>{ability_2}</a>
          </div>
          <br />
          In Bag:
          <input type="checkbox" onChange={this.handleSave} checked={saved} />
        </div>
        <div className="rightdetail-container">
          <PokeMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCt6APMhVhkMp4g9-ZAtyLxw77Q7kzWn8I&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Pokemon);
