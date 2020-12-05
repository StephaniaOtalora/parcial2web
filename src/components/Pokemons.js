import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pokemon from "./Pokemon";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";

const width = 1000;
const height = 700;
const margin = { top: 10, left: 100, bottom: 40, right: 10 };
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

export default class Pokemons extends React.Component {
  state = {
    pokemons: [],
  };

  componentDidMount() {
    if (!navigator.onLine) {
      if (localStorage.getItem("pokemons") === null) return;
      else {
        localStorage
          .getItem("pokemons")
          .json()
          .then((cha) => {
            this.setState({ pokemons: cha });
          });
        console.log(this.state.pokemons);
      }
    } else {
      let url ="";
      if ((navigator.language || navigator.userLanguage).includes("es")) {
        url =
          "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
      } else if (
        (navigator.language || navigator.userLanguage).includes("en")
      ) {
        url =
          "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
      }
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((cha) => {
          console.log(cha);
          this.setState({ pokemons: cha });
          localStorage.setItem("pokemons", JSON.stringify(this.state.pokemons));
          this.renderGrafica();
        });
    }
  }

  renderPokemons() {
    return (
      <div>
        <h1>
          <FormattedMessage id="title" />
        </h1>
        <Table responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>
                <FormattedMessage id="img" />
              </th>
              <th>
                <FormattedMessage id="name" />
              </th>
              <th>
                <FormattedMessage id="description" />
              </th>
              <th>
                <FormattedMessage id="weight" />
              </th>
              <th>
                <FormattedMessage id="height" />
              </th>
              <th>
                <FormattedMessage id="type" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.pokemons.map((e, i) => (
              <Pokemon key={i} pokemon={e} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  renderGrafica() {
    const canvas = d3.select(this.refs.canvas);

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 1000]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(this.state.pokemons.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(this.state.pokemons);

    console.log(bars, "bars");
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "#29B6F6")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("height", (d) => iheight - y(d.height))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  }

  render() {
    return (
      <div>
        {this.renderPokemons()}
        <div ref="canvas"></div>
      </div>
    );
  }
}
