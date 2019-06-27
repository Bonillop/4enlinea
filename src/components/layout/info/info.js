import React from "react";
import classes from "./info.module.css";

const info = props => {
  return (
    <div className={classes.info}>
      <div>
        <h2>Siguiente Turno: </h2>
      </div>
      <div>
        {props.whiteTurn ? props.estadosPosibles[2] : props.estadosPosibles[1]}
      </div>
      {props.hayGanador ? (
        <div>
          <h2>Ganó {props.ganador}</h2>
          <button onClick={() => props.reiniciarJuego()}>reiniciar</button>
        </div>
      ) : null}
      {props.sinMovimientos ? (
        <div>
        <h2>No quedan movimientos posibles</h2>
        <button onClick={() => props.reiniciarJuego()}>reiniciar</button>
      </div>
      ): null}
    </div>
  );
};

export default info;
