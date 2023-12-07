import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chart.css";

export default function Chart() {
  //DESPLIEGUE DE CURSOS Y SECCIONES

  const [asignaturaSelected, setAsignaturaSelected] = useState(); // Almacena la asignatura seleccionada para mostrarla en el modal de creacion de horario
  const [loadingAdd, setLoadingAdd] = useState({}); // Se usa para mostrar un loading mientras se agrega una seccion
  const [loadingDelete, setLoadingDelete] = useState({}); // Se usa para mostrar un loading mientras se elimina una seccion

  const [planesAñoSelected, setPlanesAñoSelected] = useState(2018); //se llama en la funcion deducir malla, almacena el estado del año seleccionado
  const [escuelaSelected, setEscuelaSelected] = useState(""); //se llama en la funcion deducir malla, almacena el estado de la escuela seleccionada
  const [id_mallaSelected, setID_MallaSelected] = useState(1); //se deduce a partir de la escuela y el año seleccionado, se usa para filtrar los cursos de la malla seleccionada

  const [allCursos, setAllCursos] = useState([]); // Todos los cursos de la BD // solo se aplica cuando se selecciona la opcion: mostrar todos
  const [mallaCursos, setMallaCursos] = useState([]); // Cursos de la malla seleccionada // no aplica si se selecciona la opcion: mostrar todos
  const [visualCursos, setVisualCursos] = useState([]); // Cursos que se muestran

  const [secciones, setSecciones] = useState(); // Secciones de visual cursos
  const [seccionInt, setSeccionInt] = useState();

  //CONFIGURACION DE HORARIOS

  const [modalHorario, setModalHorario] = useState(false); //Maneja si desplegar el modal de creacion de nuevo horario o no ( se activa cuando de hace click en agregar horario)
  const [nuevoHorario, setNuevoHorario] = useState(""); // Estado para almacenar el nuevo horario

  //Actualizar Frontend
  const [actualizar, setActualizar] = useState(false); //se usa para actualizar la tabla cuando se agrega o elimina una seccion (llama a la base de datos)

  //CODIGO NUEVO

  useEffect(() => {
    loadAllCursos();
  }, []); //cargar todos los cursos y secciones al inicio

  useEffect(() => {
    if (actualizar) {
      loadSecciones();
      setActualizar(false);
    }
  }, [actualizar]); //actualizar tabla cuando se agrega o elimina una seccion

  useEffect(() => {
    loadCursosMalla();
    setVisualCursos(mallaCursos);
  }, [escuelaSelected]); // HAY QUE ACTUALIZAR ESTO PORQUE ESTÁ RE BUGUEADO

  async function loadAllCursos() {
    try {
      const [cursosResult, seccionesResult] = await Promise.all([
        axios.get("/api/cursos"),
        axios.get("/api/grupos"),
      ]);

      setAllCursos(cursosResult.data.result);
      setSecciones(seccionesResult.data.result);
      console.log("Se cargaron todos los cursos y secciones");
      setEscuelaSelected(escuelaSelected);
    } catch (error) {
      console.error(error);
    }
  }

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
      } else if (escuelaSelected == "Ciencias de la Computación") {
        setID_MallaSelected(null);
      }
    };

    deducir_idMalla();

    const filteredAsignaturas = allCursos.filter(
      (asignatura) => asignatura.id_plan_estudios === id_mallaSelected
    );

    setMallaCursos(filteredAsignaturas);
  }

  async function loadSecciones() {
    const result = await axios.get("/api/grupos");
    const allSecciones = result.data.result;
    console.log("se cargaron todos las secciones");

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
    const n_seccion = loadSeccionesCurso(id_curso).length + 1;
    try {
      setLoadingAdd({ [id_curso]: true });

      const result = await axios.post("/api/grupos", {
        id_curso: id_curso,
        gru_iNumero: n_seccion,
      });
      setActualizar(true);
      setTimeout(() => {
        setLoadingAdd({ [id_curso]: false });
      }, 1100); // genera un pequeño delay porque por alguna razon se actualiza antes de que se agregue la seccion

      console.log("Se agregó con exito");
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarSeccion(id_grupo) {
    try {
      setLoadingDelete({ [id_grupo]: true });
      const result = await axios.delete(`/api/grupos/${id_grupo}`);
      setActualizar(true);
      setTimeout(() => {
        setLoadingDelete({ [id_grupo]: false });
      }, 1100); // genera un pequeño delay porque por alguna razon se actualiza antes de que se agregue la seccion
    } catch (error) {
      console.error(error);
    }

    /* Calcular el nuevo gruiNumero de los demas y actualizarlo*/
  }

  //CODIGO ANTIGUOOO

  // Función para manejar el cambio en el select de horarios, despliega el modal de creación de horario si se selecciona "Agregar horario"
  const handleHorarioChange = (e) => {
    const seleccionado = e.target.value;

    const desplegarModalHorario = () => {
      setModalHorario(true);
    };

    if (seleccionado === "Agregar horario") {
      // Llamar a tu función para agregar horario
      desplegarModalHorario();
      // Obtener las opciones específicas del select
      const opciones = e.target.getAttribute("data-opciones").split(",");
      const seccion_index = e.target.getAttribute("index");

      // Obtener el índice del penúltimo elemento
      const penultimoIndice = opciones.length - 2;

      // Establecer el valor del select como el penúltimo elemento
      e.target.selectedIndex = penultimoIndice;
    }
  };

  const handleCloseModal = () => {
    setModalHorario(false);
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
    "Agregar horario",
  ];

  const generateAulasOptions = () => {
    var aulasOptionsAP = [
      ...Array(3)
        .fill()
        .map((_, i) =>
          Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`)
        ),
    ].flat();

    var aulasOptionsNP = [
      ...Array(3)
        .fill()
        .map((_, i) =>
          Array.from({ length: 9 }, (_, j) => `${i + 1}0${j + 1}`)
        ),
    ].flat();

    // Duplicar la lista de aulas y concatenar "AP" y "NP"
    var aulasOptionsAP = aulasOptionsAP.flatMap((aula) => [`${aula} AP`]);
    var aulasOptionsNP = aulasOptionsNP.flatMap((aula) => [`${aula} NP`]);
    const aulasOptions = aulasOptionsAP.concat(aulasOptionsNP);

    return aulasOptions;
  };

  const aulasOptions = generateAulasOptions();

  const handleClickSeccion = (curso, actual_index, index_oficial) => {
    setSeccionInt(actual_index);
    setAsignaturaSelected(curso);
    console.log("Seccion: ", actual_index, " de ", curso.nombre_curso);
  };

  const actualizarIndexSeccion = (actual_index, grupo) => {
    const index_oficial = grupo.gru_iNumero;
    const id_grupo = grupo.id_grupo;

    if (index_oficial) {
      if (actual_index == index_oficial) {
        console.log("los index son iguales");
        return "No deberias poder estar viendo esto";
      } else {
        console.log("los index son distintos", actual_index, index_oficial);
        return (
          " Es " + index_oficial + " Pero Debiese ser " + actual_index + ""
        );
        // Actualizar el index de la seccion mandando un PUT a la database
      }
    }
  };

  return (
    <div className="chart">
      {modalHorario && (
        <div className="modalHorario-container">
          <div className="modalHorario">
            <div className="modalHorario-header">
              <p>{asignaturaSelected && asignaturaSelected.nombre_curso}</p>
              <h4 className="close" onClick={handleCloseModal}>
                x
              </h4>
            </div>
            <div className="modalHorario-body">
              <div className="body-top-information">
                {"Sección " + seccionInt}
              </div>
              <div className="schedule-creation-device"></div>
            </div>
          </div>
        </div>
      )}
      ,
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
                      <td>
                        {/* Si seccion.gru_iNumero es igual a index, mostrar el segundo */}
                        {seccion.gru_iNumero === index + 1
                          ? seccion.gru_iNumero
                          : // Si no son iguales, ejecutar la función actualizarIndexSecciones
                            actualizarIndexSeccion(index + 1, seccion)}
                      </td>
                      <td className="desplegable">
                        <select
                          onClick={() =>
                            handleClickSeccion(
                              curso,
                              index + 1,
                              seccion.gru_iNumero
                            )
                          }
                          onChange={handleHorarioChange}
                          data-opciones={
                            horariosOptions.join(
                              ","
                            ) /* Cambiar cuando se termine de configurar el modal crear horario*/
                          }
                          index={index}
                        >
                          {horariosOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
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
                      <td
                        className="delete"
                        onClick={() => eliminarSeccion(seccion.id_grupo)}
                      >
                        {loadingDelete[seccion.id_grupo] ? (
                          <div className="spinner"></div>
                        ) : (
                          <h3>x</h3>
                        )}
                      </td>
                    </tr>
                  )
              )}

              <tr>
                <td
                  className="add-seccion"
                  onClick={() => agregarSeccion(curso.id_curso)}
                >
                  {loadingAdd[curso.id_curso] ? (
                    <div className="spinner"></div>
                  ) : (
                    <h3>+</h3>
                  )}
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
