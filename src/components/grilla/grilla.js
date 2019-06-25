import React from "react";
import classes from "./grilla.module.css";
import Celda from "./celda/celda";

const Grilla = props => {
  let filas = [...Array(props.numFilas)];
  let columnas = [...Array(props.numColumnas)];

  return (
    <div className={classes.grilla}>
      {filas.map((value, indexFilas) => {
        return (
          <div key={indexFilas} className={classes.fila}>
            {columnas.map((value, index) => {
              return (
                <Celda
                  key={props.getArrayIndex(indexFilas, index)}
                  handleClick={() => props.handleClick(indexFilas, index)}
                  value={props.handleGetValue(indexFilas, index)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grilla;
