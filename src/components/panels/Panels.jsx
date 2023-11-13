import React from "react";
import Schedule from "../right-panel/schedule/Shedule";
import Chart from "../left-panel/chart/Chart";
import "./Panels.css";

export function Panels() {
  const datosPrueba = [
    {
      name: "Programación y Computación",
      secciones: {
        "1": {
          id: "asddas85888d",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          id: "asdda000sd",
          horario: "Martes 10:00 AM",
          aula: "102",
        }
      },
    },
      
   
    {
      name: "Algorítmica I",
      secciones: {
        "1": {
          id: "asddasd",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          id: "asddassdd",
          horario: "Martes 10:00 AM",
          aula: "102",
        },
        "3": {
          id: "asddas554d",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        
      },
    },
    {
      name: "Sistemas Operativos",
      secciones: {
        "1": {
          id: "asddasd84sws",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          id: "asddasas6dd",
          horario: "Martes 10:00 AM",
          aula: "102",
        }
      },
    },
    {
      name: "Cálculo II",
      secciones: {
        
        "1": {
          id: "asddas654sd",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          id: "asddas965ssd",
          horario: "Martes 10:00 AM",
          aula: "102",
        }
      },
    },
    {
      name: "Redacción y Tecnicas de Comunicación Efectiva",
      secciones: {
        "1": {
          id: "asdda54625626sd",
          horario: "Lunes 8:00 AM",
          aula: "101",
        },
        "2": {
          id: "asddass699d",
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
