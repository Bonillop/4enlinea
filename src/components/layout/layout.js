import React, { Component } from "react";
import Grilla from "../grilla/grilla";
import classes from "./layout.module.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numGrillas: 1,
      numFilas: 8,
      numColumnas: 8,
      /**
       * Para utilizar una imagen pasar directamente el tag img con la classname imagen y el 
       * src dentro de la carpeta assets y la imagen. Ejemplo:
       */
      estadosPosibles: [" ", "X", "O",
        <img className={classes.imagen} alt='patita' src='/assets/patita.svg' />,
        <img className={classes.imagen} alt='patita' src='/assets/hot-dog.svg' />],
      estadosCeldas: []
    };
  }

  inicializarEstados() {
    let estadosCeldas = new Array(this.state.numColumnas * this.state.numFilas);
    for (let i = 0; i < estadosCeldas.length; ++i) {
      estadosCeldas[i] = 0;
    }
    this.setState({ estadosCeldas });
  }

  componentDidMount() {
    this.inicializarEstados();
  }

  getArrayIndex = (fila, columna) => {
    return fila * this.state.numColumnas + columna;
  };

  handleGetValue = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let value = this.state.estadosCeldas[arrayIndex]
    return this.state.estadosPosibles[value];
  };

  handleClick = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let estadoActual = this.state.estadosCeldas[arrayIndex];
    let nuevoEstado = [...this.state.estadosCeldas];

    for (let key in this.state.estadosPosibles) {
      if (estadoActual === +key) {
        if (this.state.estadosPosibles[+key + 1]) {
          nuevoEstado[arrayIndex] = +key + 1;
        } else {
          nuevoEstado[arrayIndex] = 0;
        }
      }
    }
    this.setState({ estadosCeldas: nuevoEstado });
  };

  render() {
    let grillas = [...Array(this.state.numGrillas)];

    return (
      <div className={classes.layout}>
        {grillas.map((value, index) => {
          return (
            <Grilla
              key={index}
              numFilas={this.state.numFilas}
              numColumnas={this.state.numColumnas}
              handleClick={this.handleClick}
              handleGetValue={this.handleGetValue}
              getArrayIndex={this.getArrayIndex}
            />
          );
        })}
      </div>
    );
  }
}

export default Layout;
