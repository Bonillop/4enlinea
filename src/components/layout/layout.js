import React, { Component } from "react";
import Grilla from "../grilla/grilla";
import Info from "./info/info";
import classes from "./layout.module.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hayGanador: false,
      ganador: "",
      whiteTurn: true,
      numGrillas: 1,
      numFilas: 8,
      numColumnas: 8,
      sinMovimientos: false,
      /**
       * Para utilizar una imagen pasar directamente el tag img con la classname imagen y el
       * src dentro de la carpeta assets y la imagen. Ejemplo:
       */
      estadosPosibles: [
        " ",
        <img className={classes.imagen} alt="black" src="/assets/black.svg" />,
        <img className={classes.imagen} alt="white" src="/assets/white.svg" />
      ],
      estadosCeldas: []
    };
  }

  reiniciarJuego = () => {
    let nuevoEstado = { ...this.state };

    nuevoEstado.hayGanador = false;
    nuevoEstado.ganador = "";
    nuevoEstado.whiteTurn = true;
    nuevoEstado.estadosCeldas.fill(0);
    this.setState(nuevoEstado);
  };

  checkSinMovimientos() {
    let sinMovimientos;
    if (!this.state.estadosCeldas.includes(0)) {
      sinMovimientos = true;
      this.setState({ sinMovimientos });
    }
  }

  inicializarEstados() {
    let estadosCeldas = new Array(
      this.state.numColumnas * this.state.numFilas
    ).fill(0);
    this.setState({ estadosCeldas });
  }

  componentDidMount() {
    this.inicializarEstados();
  }

  componentDidUpdate() {
    console.log("pepe");
    if (!this.state.sinMovimientos) {
      this.checkSinMovimientos();
    }
  }

  getArrayIndex = (fila, columna) => {
    return fila * this.state.numColumnas + columna;
  };

  handleGetValue = (fila, columna) => {
    let arrayIndex = this.getArrayIndex(fila, columna);
    let value = this.state.estadosCeldas[arrayIndex];
    return this.state.estadosPosibles[value];
  };

  handleClick = (fila, columna) => {
    if (!this.state.hayGanador) {
      console.time("pepe");
      this.ponerFicha(this.getArrayIndex(fila, columna));
    }
  };

  ponerFicha = arrayIndex => {
    let estadoActual = this.state.estadosCeldas[arrayIndex];
    let offset = arrayIndex + this.state.numColumnas;
    let nuevoEstado = [...this.state.estadosCeldas];

    if (estadoActual === 0) {
      if (nuevoEstado[offset] === 0) {
        this.ponerFicha(offset);
      } else {
        if (this.state.whiteTurn) {
          nuevoEstado[arrayIndex] = 2;
        } else {
          nuevoEstado[arrayIndex] = 1;
        }
        let turnoActual = this.state.whiteTurn;
        let siguienteTurno = !this.state.whiteTurn;
        this.setState({
          estadosCeldas: nuevoEstado,
          whiteTurn: siguienteTurno
        });

        if (this.hayGanador(nuevoEstado, arrayIndex)) {
          let ganador;
          if (turnoActual) {
            ganador = "Blanco";
          } else {
            ganador = "Negro";
          }
          this.setState({ hayGanador: true, ganador: ganador });
        }
        console.timeEnd("pepe");
      }
    }
  };

  checkDerecha(nuevoEstado, arrayIndex) {
    /**
     *  Para los casos en los que hay un desplazamiento horizontal, es importante validar tambien la fila en la que se 
     * encuentra la última posicion a validar, ya que al trabajar con un array, el offset se puede ver afectado por el
     * desplazamiento horizontal en los casos que se dibuja en los límites de la grilla. Es medio feo pero funciona
     */ 
    if (
      nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + 3] &&
      Math.floor(+arrayIndex / this.state.numColumnas) ===
        Math.floor((+arrayIndex + 3) / this.state.numColumnas)
    ) {
      if (
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + 2] &&
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + 1]
      ) {
        return true;
      }
    }
    return false;
  }

  checkAbajoDerecha(nuevoEstado, arrayIndex, offset) {
    if (
      nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset * 3 + 3] &&
      Math.floor(+arrayIndex / this.state.numColumnas) ===
        Math.floor((+arrayIndex + offset * 3 + 3) /this.state.numColumnas) - 3
    ) {
      if (
        nuevoEstado[+arrayIndex] ===
          nuevoEstado[+arrayIndex + offset * 2 + 2] &&
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset + 1]
      ) {
        return true;
      }
    }
    return false;
  }

  checkAbajo(nuevoEstado, arrayIndex, offset) {
    if (nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset * 3]) {
      if (
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset * 2] &&
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset]
      ) {
        return true;
      }
    }
    return false;
  }

  checkAbajoIzquierda(nuevoEstado, arrayIndex, offset) {
    if (
      nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset * 3 - 3] &&
      Math.floor(+arrayIndex / this.state.numColumnas) ===
      Math.floor((+arrayIndex + offset * 3 - 3) /this.state.numColumnas) - 3
    ) {
      if (
        nuevoEstado[+arrayIndex] ===
          nuevoEstado[+arrayIndex + offset * 2 - 2] &&
        nuevoEstado[+arrayIndex] === nuevoEstado[+arrayIndex + offset - 1]
      ) {
        return true;
      }
    }
    return false;
  }

  hayGanador = (nuevoEstado, arrayIndex) => {
    let offset = this.state.numColumnas;
    // let valorFicha = nuevoEstado[arrayIndex];
    // let existencias = 0;

    for (let arrayIndex in nuevoEstado) {
      if (nuevoEstado[+arrayIndex] !== 0) {
        if (
          this.checkDerecha(nuevoEstado, +arrayIndex) ||
          this.checkAbajoDerecha(nuevoEstado, +arrayIndex, offset) ||
          this.checkAbajo(nuevoEstado, +arrayIndex, offset) ||
          this.checkAbajoIzquierda(nuevoEstado, +arrayIndex, offset)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  render() {
    let grillas = [...Array(this.state.numGrillas)];

    return (
      <div className={classes.layout}>
        <Info
          whiteTurn={this.state.whiteTurn}
          estadosPosibles={this.state.estadosPosibles}
          hayGanador={this.state.hayGanador}
          ganador={this.state.ganador}
          reiniciarJuego={this.reiniciarJuego}
        />
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
