import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chart.css";

export default function Chart({ datos }) {
  const [nuevoHorario, setNuevoHorario] = useState(""); // Estado para almacenar el nuevo horario
  const [asignaturas, setAsignaturas] = useState(datos);

  const [allCursos, setAllCursos] = useState([]); // Todos los cursos de la BD // solo se aplica cuando se selecciona la opcion: mostrar todos
  const [mallaCursos, setMallaCursos] = useState([]); // Cursos de la malla seleccionada // no aplica si se selecciona la opcion: mostrar todos
  const [visualCursos, setVisualCursos] = useState([]); // Cursos que se muestran

  const [secciones, setSecciones] = useState(); // Secciones de la malla

  const [idSelected, setIdSelected] = useState("");
  const [modalHorario, setModalHorario] = useState(false);
  const [asignaturaSelected, setAsignaturaSelected] = useState();
  const [escuelaSelected, setEscuelaSelected] = useState(
    "Ingeniería de Software"
  );
  const [planesAñoSelected, setPlanesAñoSelected] = useState(2018); //se llama en la funcion deducir malla, almacena el estado del año seleccionado
  const [id_mallaSelected, setID_MallaSelected] = useState(1);

  const [actualizar, setActualizar] = useState(false);

  //CODIGO NUEVO

  useEffect(() => {
    loadAllCursos();
    loadAllSecciones();
    setActualizar(false);
  }, [actualizar]);

  useEffect(() => {
    setVisualCursos(mallaCursos);
  }, [mallaCursos]);

  async function loadAllCursos() {
    const result = await axios.get("http://localhost:3000/api/cursos");
    setAllCursos(result.data.result);
  }

  //loadCursos sin api

  async function loadCursosMalla() {
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

    deducir_idMalla();

    const filteredAsignaturas = allCursos.filter(
      (asignatura) => asignatura.id_plan_estudios === id_mallaSelected
    );

    setMallaCursos(filteredAsignaturas);
  }

  async function loadAllSecciones() {
    const result = await axios.get("http://localhost:3000/api/secciones");
    const allSecciones = result.data.result;
    setSecciones(allSecciones);
  }

  const loadSeccionesCurso = (id_curso) => {
    if (secciones) {
      const filteredSecciones = secciones.filter(
        (seccion) => seccion.id_curso === id_curso
      );
      return filteredSecciones;
    } else {
      console.log(secciones, " null");
    }
  };

  const handleEscuelaChange = (e) => {
    const seleccionado = e.target.value;
    setEscuelaSelected(seleccionado);
  };

  const escuelasOptions = [
    "Ingeniería de Software",
    "Ingeniería de Sistemas",
    "Ciencias de la Computación",
  ];

  const handleMallaChange = (e) => {
    const seleccionado = e.target.value;

    if (seleccionado == "Todas") {
      setVisualCursos(allCursos);
    } else {
      setPlanesAñoSelected(seleccionado); // se procederá a dedecudir
      loadCursosMalla();
      setVisualCursos(mallaCursos);
    }
  };

  const mallasOptions = [2011, 2015, 2018, 2023, "Todas"];

  async function agregarSeccion(id_curso) {
    try {
      const result = await axios.post("http://localhost:3000/api/secciones", {
        id_curso: id_curso,
      });
      setActualizar(true);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarSeccion(id_grupo) {
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/secciones/${id_grupo}`
      );
      setActualizar(true);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  //CODIGO ANTIGUOOO

  // Función para manejar el cambio en el select de horarios
  const handleHorarioChange = (e) => {
    const seleccionado = e.target.value;

    const desplegarModalHorario = () => {
      setModalHorario(true);
    };

    if (seleccionado === "Agregar horario") {
      // Llamar a tu función para agregar horario
      desplegarModalHorario();
            // Obtener las opciones específicas del select
            const opciones = e.target.getAttribute('data-opciones').split(',')
            console.log(opciones)

            // Obtener el índice del penúltimo elemento
            const penultimoIndice = opciones.length - 2;
      
            // Establecer el valor del select como el penúltimo elemento
            e.target.selectedIndex = penultimoIndice;
    }
  };

  const handleCloseModal = () => {
    setModalHorario(false);
  };

  const handleClickAsignatura = (id_curso) => {
    async function getCursoName(id_curso) {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/cursos/${id_curso}`
        );
        setAsignaturaSelected(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    getCursoName(id_curso);
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

  const generateAulasOptions = () => {

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

  return aulasOptions;
  }

  const aulasOptions = generateAulasOptions();

  return (
    <div className="chart">
      {modalHorario && (
        <div className="modalHorario-container">
          <div className="modalHorario">
            <div className="modalHorario-header">
              <p>{asignaturaSelected.nombre_curso}</p>
              <h4 className="close" onClick={handleCloseModal}>
                x
              </h4>
            </div>
          </div>
        </div>
      )}

      <div className="selects-container">
        <select onChange={handleEscuelaChange} className="malla&year">
          <option value="">Seleccionar escuela</option>
          {escuelasOptions.map((escuela, index) => (
            <option key={index} value={escuela}>
              {escuela}
            </option>
          ))}
        </select>

        <select onChange={handleMallaChange} className="malla&year">
          <option value="">Seleccionar malla</option>
          {mallasOptions.map((malla, index) => (
            <option key={index} value={malla}>
              {malla}
            </option>
          ))}
        </select>
      </div>

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
          {visualCursos.map((curso, index) => (
            <React.Fragment key={index}>
              <tr className="asignatura">
                <td rowSpan={loadSeccionesCurso(curso.id_curso).length + 2}>
                  <p>{curso.nombre_curso}</p>
                </td>
              </tr>

              {Object.values(loadSeccionesCurso(curso.id_curso)).map(
                (seccion, index) =>
                  seccion && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="desplegable">
                        <select
                          onChange={handleHorarioChange}
                          onClick={() => handleClickAsignatura(curso.id_curso)}
                          data-opciones={horariosOptions.join(',') /* Cambiar cuando se termine de configurar el modal crear horario*/}
                        >
                          {horariosOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="desplegable">
                        <select
                          onClick={() => handleClickAsignatura(curso.id_curso)}
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
                        onClick={() => eliminarSeccion(seccion.id_grupo)}
                      >
                        <h3>x</h3>
                      </td>
                    </tr>
                  )
              )}

              <tr>
                <td
                  className="add-seccion"
                  onClick={() => agregarSeccion(curso.id_curso)}
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
