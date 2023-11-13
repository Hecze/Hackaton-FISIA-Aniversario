import React, { useState, useEffect } from "react";
import "./Chart.css";

export default function Chart({ datos }) {
  const [nuevoHorario, setNuevoHorario] = useState(""); // Estado para almacenar el nuevo horario

  // Función para manejar el cambio en el select de horarios
  const handleHorarioChange = (e) => {
    const seleccionado = e.target.value;

    if (seleccionado === "Agregar horario") {
      // Llamar a tu función para agregar horario
      agregarNuevoHorario();
    }
  };

  // Función para agregar un nuevo horario
  const agregarNuevoHorario = () => {
    // Lógica de tu función para agregar horario
    // Por ejemplo, podrías abrir un modal para ingresar el nuevo horario
    console.log("Llamar a tu función para agregar horario aquí");

    // También podrías limpiar la selección del select
    setNuevoHorario("");
  };

  const horariosOptions = [
    "Seleccionar horario",
    "Lunes 8:00-12:00",
    "Viernes 8:00-12:00",
    "Miércoles 2:00-6:00",
    /*... más opciones ...*/ "Agregar horario",
  ];
  var aulasOptionsAP = [
    ...Array(3)
      .fill()
      .map((_, i) => Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`)),
  ].flat();

  var aulasOptionsNP = [
    ...Array(3)
      .fill()
      .map((_, i) => Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`)),
  ].flat();

  // Duplicar la lista de aulas y concatenar "AP" y "NP"
  var aulasOptionsAP = aulasOptionsAP.flatMap((aula) => [`${aula} AP`]);
  var aulasOptionsNP = aulasOptionsNP.flatMap((aula) => [`${aula} NP`]);
  const aulasOptions = aulasOptionsAP.concat(aulasOptionsNP);

  return (
    <div className="chart">
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Sección</th>
            <th>Horario</th>
            <th>Aula</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datos.map((asignatura, index) => (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={Object.values(asignatura.secciones).length + 2}>
                  {asignatura.name}
                </td>
              </tr>

              {Object.values(asignatura.secciones).map((seccion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="desplegable">
                    {seccion.horario ? (
                    <select  onChange={handleHorarioChange}>
                    {horariosOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                    ) : (
                      <div className="add-horario" />
                    )}
                  </td>
                  <td className="desplegable">
                    <select>
                      {aulasOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="delete">
                    <h3>x</h3>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="add-seccion">
                  <h2>+</h2>
                </td>
                <td colSpan="3" className="add-seccion-span"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
