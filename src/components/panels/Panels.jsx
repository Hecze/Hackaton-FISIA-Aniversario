import React from "react";
import Schedule from "../right-panel/schedule/Shedule";
import Chart from "../left-panel/chart/Chart";
import "./Panels.css";

export function Panels() {
  const datosPrueba = [
    {
      name: "Matemáticas",
      secciones: {
        "1": {
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          horario: "Martes 10:00 AM",
          aula: "102",
        }
      },
    },
      
   
    {
      name: "Historia",
      secciones: {
        "1": {
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          horario: "Martes 10:00 AM",
          aula: "102",
        }
      },
    },
    // Agrega más datos según sea necesario
  ];

  return (
    <div className="page">
      <div className="panels">
        <div className="left-panel">
          <Chart datos={datosPrueba} />
        </div>
        <div className="right-panel">
          <Schedule />
        </div>
      </div>
    </div>
  );
}
