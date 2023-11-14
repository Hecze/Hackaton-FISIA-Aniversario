import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chart.css";

export default function Chart({ datos }) {
  const [nuevoHorario, setNuevoHorario] = useState(""); // Estado para almacenar el nuevo horario
  const [asignaturas, setAsignaturas] = useState(datos);

  const [allCursos, setAllCursos] = useState([]); // Todos los cursos de la BD // solo se aplica cuando se selecciona la opcion: mostrar todos
  const [mallaCursos, setMallaCursos] = useState([]); // Cursos de la malla seleccionada // no aplica si se selecciona la opcion: mostrar todos
  const [visualCursos, setVisualCursos] = useState([]); // Cursos que se muestran

  const [idSelected, setIdSelected] = useState("");
  const [modalHorario, setModalHorario] = useState(false);
  const [asignaturaSelected, setAsignaturaSelected] = useState("");
  const { v4: uuidv4 } = require("uuid");

  const [escuelaSelected, setEscuelaSelected] = useState(
    "Ingeniería de Software"
  );
  const [planesAñoSelected, setPlanesAñoSelected] = useState([]);
  const [id_mallaSelected, setID_MallaSelected] = useState(1);
  const [cursos, setCursos] = useState([]);

  //CODIGO NUEVO

  const deducir_idMalla = () => {
    if (escuelaSelected == "Ingeniería de Software") {
      if (planesAñoSelected == "2011") {
        setID_MallaSelected(1);
      } else if (planesAñoSelected == "2015") {
        setID_MallaSelected(2);
      } else if (planesAñoSelected == "2018") {
        setID_MallaSelected(3);
      } else if (planesAñoSelected == "2023") {
        setID_MallaSelected(4);
      }
    } else if (escuelaSelected == "Ingeniería de Sistemas") {
      if (planesAñoSelected == "2011") {
        setID_MallaSelected(5);
      } else if (planesAñoSelected == "2015") {
        setID_MallaSelected(6);
      } else if (planesAñoSelected == "2018") {
        setID_MallaSelected(7);
      } else if (planesAñoSelected == "2023") {
        setID_MallaSelected(8);
      }
    }

    async function loadMalla() {
      const result = await axios.get("http://localhost:3000/api/planes");
      return result.data.result;
    }
  };

  async function loadCursos() {
    async function loadAsignaturas() {
      const result = await axios.get("http://localhost:3000/api/cursos");
      return result.data.result;
    }

    const asignaturas = await loadAsignaturas();

    const filteredAsignaturas = asignaturas.filter(
      (asignatura) => asignatura.id_plan_estudios === id_mallaSelected
    );

    setAllCursos(asignaturas);
    setMallaCursos(filteredAsignaturas);
  }

  async function loadSecciones(id_curso) {
    var result = await axios.get(
      "http://localhost:3000/api/secciones/" + id_curso
    );
    return result.data;
  }


  //CODIGO ANTIGUOOO
  const randomId = () => {
    return uuidv4();
  };

  const searchId = (seccion) => {
    setIdSelected(seccion.id);
  };

  // Generar un nuevo ID aleatorio

  // Función para manejar el cambio en el select de horarios
  const handleHorarioChange = (e) => {
    const seleccionado = e.target.value;
    const desplegarModalHorario = () => {
      setModalHorario(true);
    };

    if (seleccionado === "Agregar horario") {
      // Llamar a tu función para agregar horario
      desplegarModalHorario();
    }
  };

  const handleCloseModal = () => {
    setModalHorario(false);
  };

  const handleClickAsignatura = (asignatura) => {
    /* guardar en asignatureSelected el nombre del id del div al que se le hizo click*/
    console.log(asignatura.name);
    setAsignaturaSelected(asignatura.name);
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

  const agregarSeccion = (asignatura_input, horario = "xd") => {
    const nuevaSeccion = {
      id: randomId(),
      horario: horario,
      aula: "",
    };

    // Buscar asignatura.name de Asignaturas y agregarle la nueva sección

    const asignaturasActualizadas = asignaturas.map((asignatura) => {
      if (asignatura.name === asignatura_input.name) {
        return {
          ...asignatura,
          secciones: {
            ...asignatura.secciones,
            [Object.keys(asignatura.secciones).length + 1]: nuevaSeccion,
          },
        };
      } else {
        return asignatura; // Devolver la asignatura sin modificar
      }
    });

    console.log(asignaturasActualizadas);
    setAsignaturas(asignaturasActualizadas);
  };

  const eliminarSeccion = (seccion) => {
    searchId(seccion);
    //buscar en todas las asignaturas todas sus secciones y eliminar la que tenga la id seleccionada
    const asignaturasActualizadas = asignaturas.map((asignatura) => {
      return {
        ...asignatura,
        secciones: Object.values(asignatura.secciones).filter(
          (seccion) => seccion.id !== idSelected
        ),
      };
    });
    setAsignaturas(asignaturasActualizadas);
  };

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
      {modalHorario && (
        <div className="modalHorario-container">
          <div className="modalHorario">
            <div className="modalHorario-header">
              <hp>{asignaturaSelected}</hp>
              <h4 className="close" onClick={handleCloseModal}>
                x
              </h4>
            </div>
          </div>
        </div>
      )}
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
          {asignaturas.map((asignatura, index) => (
            <React.Fragment key={index}>
              <tr className="asignatura">
                <td rowSpan={Object.values(asignatura.secciones).length + 2}>
                  <p>{asignatura.name}</p>
                </td>
              </tr>

              {Object.values(asignatura.secciones).map(
                (seccion, index) =>
                  seccion && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="desplegable">
                        {seccion.horario ? (
                          <select
                            onChange={handleHorarioChange}
                            onClick={() => handleClickAsignatura(asignatura)}
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
                      <td className="desplegable">
                        <select
                          onClick={() => handleClickAsignatura(asignatura)}
                        >
                          {aulasOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td
                        className="delete"
                        onClick={() => eliminarSeccion(seccion)}
                      >
                        <h3>x</h3>
                      </td>
                    </tr>
                  )
              )}

              <tr>
                <td
                  className="add-seccion"
                  onClick={() => agregarSeccion(asignatura)}
                >
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
