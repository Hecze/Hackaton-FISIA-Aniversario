import React, { useState, useEffect } from "react";
import "./Chart.css";

export default function Chart({ datos }) {
  const [nuevosHorarios, setNuevosHorarios] = useState({}); // Estado para almacenar los nuevos horarios por sección

  const horariosOptions = ["Seleccionar horario", "Lunes 8:00-12:00", "Viernes 8:00-12:00", "Miércoles 2:00-6:00", "Agregar horario"];
  var aulasOptionsAP = [...Array(3).fill().map((_, i) => Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`))].flat();
  var aulasOptionsNP = [...Array(3).fill().map((_, i) => Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`))].flat();
  var aulasOptionsAP = aulasOptionsAP.flatMap((aula) => [`${aula} AP`]);
  var aulasOptionsNP = aulasOptionsNP.flatMap((aula) => [`${aula} NP`]);
  const aulasOptions = aulasOptionsAP.concat(aulasOptionsNP);

  // Función para manejar el cambio en el select de horarios por sección
  const handleHorarioChange = (seccion, seleccionado) => {
    if (seleccionado === "Agregar horario") {
      // Llamar a tu función para agregar horario
      agregarNuevoHorario(seccion);
    } else {
      // Actualizar el estado de los nuevos horarios solo para la sección específica
      setNuevosHorarios((prevHorarios) => ({
        ...prevHorarios,
        [seccion]: seleccionado,
      }));
    }
  };

  // Función para agregar un nuevo horario por sección
  const agregarNuevoHorario = (seccion) => {
    // Lógica de tu función para agregar horario
    // Por ejemplo, podrías abrir un modal para ingresar el nuevo horario
    console.log(`Llamar a tu función para agregar horario en la sección ${seccion} aquí`);

    // También podrías limpiar la selección del select para esa sección
    setNuevosHorarios((prevHorarios) => ({
      ...prevHorarios,
      [seccion]: "",
    }));
  };

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
                  <td>
                    {seccion.horario ? (
                      <select
                        value={nuevosHorarios[seccion] || ""}
                        onChange={(e) => handleHorarioChange(seccion, e.target.value)}
                      >
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
                  <td>
                    <select>
                      {aulasOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="delete">
                    <h1>x</h1>
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
