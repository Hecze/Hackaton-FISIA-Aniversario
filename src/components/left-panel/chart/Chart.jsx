import React, { useState, useEffect } from "react";
import "./Chart.css";

export default function Chart({ datos }) {
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
                      seccion.horario
                    ) : (
                      <div className="add-horario" />
                    )}
                  </td>
                  <td>{seccion.aula}</td>
                  <td className="delete">
                    <h1>
                      x
                    </h1>
                  </td>
                </tr>
              )) }
              <td className="add-seccion" ><h2>+</h2></td>
              <td colSpan="3" className="add-seccion-span"></td>
              
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
