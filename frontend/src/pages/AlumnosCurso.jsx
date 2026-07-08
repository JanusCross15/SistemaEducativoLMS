import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { listarAlumnosCurso } from "../services/alumnoCursoService";
import { listarCursos } from "../services/cursoService";
import { listarDocentes } from "../services/docenteService";
import "./AlumnosCurso.css";

function AlumnosCurso() {
  const [cursos, setCursos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [idCurso, setIdCurso] = useState("");
  const [idDocente, setIdDocente] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  useEffect(() => {
    cargarCursos();
    cargarDocentes();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await listarCursos();
      setCursos(response.data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const cargarDocentes = async () => {
    try {
      const response = await listarDocentes();
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
    }
  };

  const buscar = async () => {
    if (!idCurso || !idDocente) {
      Swal.fire(
        "Campos requeridos",
        "Seleccione un curso y un docente",
        "warning",
      );
      return;
    }

    setCargando(true);
    setBuscado(true);

    try {
      const response = await listarAlumnosCurso(idCurso, idDocente);
      setAlumnos(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudieron obtener los datos", "error");
      setAlumnos([]);
    } finally {
      setCargando(false);
    }
  };

  const contarAprobados = () =>
    alumnos.filter((a) => a.estado === "APROBADO").length;
  const contarDesaprobados = () =>
    alumnos.filter((a) => a.estado === "DESAPROBADO").length;

  const esFemenino = (grado) => {
    return false;
  };

  return (
    <div className="alumnos-container">
      <Sidebar />

      <div className="alumnos-main">
        <div className="alumnos-header">
          <div className="alumnos-header-info">
            <h2>Listado de Alumnos por Curso</h2>
            <p>Aprobados y Desaprobados - C.E.P. La Sagrada Familia</p>
          </div>
        </div>

        <div className="alumnos-filtros">
          <div className="alumnos-filtro-group">
            <label>Curso</label>
            <select
              value={idCurso}
              onChange={(e) => setIdCurso(e.target.value)}
            >
              <option value="">Seleccione curso</option>
              {cursos.map((c) => (
                <option key={c.idCurso} value={c.idCurso}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="alumnos-filtro-group">
            <label>Docente</label>
            <select
              value={idDocente}
              onChange={(e) => setIdDocente(e.target.value)}
            >
              <option value="">Seleccione docente</option>
              {docentes.map((d) => (
                <option key={d.idDocente} value={d.idDocente}>
                  {d.nombres} {d.apellidos}
                </option>
              ))}
            </select>
          </div>
          <button
            className="alumnos-btn-buscar"
            onClick={buscar}
            disabled={cargando}
          >
            {cargando ? "Buscando..." : "Buscar Alumnos"}
          </button>
        </div>

        {buscado && (
          <>
            <div className="alumnos-resumen">
              <div className="alumnos-resumen-card total">
                <span className="resumen-number">{alumnos.length}</span>
                <span className="resumen-label">Total</span>
              </div>
              <div className="alumnos-resumen-card aprobados">
                <span className="resumen-number">{contarAprobados()}</span>
                <span className="resumen-label">Aprobados</span>
              </div>
              <div className="alumnos-resumen-card desaprobados">
                <span className="resumen-number">{contarDesaprobados()}</span>
                <span className="resumen-label">Desaprobados</span>
              </div>
            </div>

            <div className="alumnos-card">
              <div className="alumnos-card-header">
                <h5>Resultado del Listado</h5>
              </div>

              {alumnos.length === 0 ? (
                <div className="alumnos-empty">
                  <h5>No se encontraron alumnos</h5>
                  <p>No hay calificaciones registradas para este curso</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="alumnos-table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Nombres</th>
                        <th>Grado</th>
                        <th>Seccion</th>
                        <th>Promedio</th>
                        <th>Estado</th>
                        <th>Observaciones</th>
                        <th>Tareas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alumnos.map((alumno, index) => (
                        <tr key={index}>
                          <td>
                            <span className="badge-codigo">
                              {alumno.codigo}
                            </span>
                          </td>
                          <td>{alumno.nombreCompleto.split(",")[0]}</td>
                          <td>
                            {alumno.nombreCompleto.split(",")[1]?.split(" ")[0]}
                          </td>
                          <td>
                            {alumno.nombreCompleto
                              .split(",")[1]
                              ?.split(" ")
                              .slice(1)
                              .join(" ")}
                          </td>
                          <td>{alumno.grado}</td>
                          <td>{alumno.seccion}</td>
                          <td>
                            <span
                              className={`promedio ${alumno.estado === "APROBADO" ? "aprobado" : "desaprobado"}`}
                            >
                              {alumno.promedio}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge-estado ${alumno.estado === "APROBADO" ? "aprobado" : "desaprobado"}`}
                            >
                              {alumno.estado}
                            </span>
                          </td>
                          <td className="observaciones-cell">
                            {alumno.observaciones}
                          </td>
                          <td>{alumno.totalTareas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AlumnosCurso;
