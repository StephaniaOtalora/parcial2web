import React from "react";

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: this.props.pokemon,
    };
  }

  render() {
    return (
      <tr>
        <td>{this.state.pokemon.id}</td>
        <td>
          <img src={this.state.pokemon.ThumbnailImage}></img>
        </td>
        <td>{this.state.pokemon.name}</td>
        <td>{this.state.pokemon.description}</td>
        <td>{this.state.pokemon.height}</td>
        <td>{this.state.pokemon.weight}</td>

        <td>
          {this.state.pokemon.type.map((key) => (
            <span className="badge badge-primary">{key}</span>
          ))}
        </td>
      </tr>
    );
  }
}
