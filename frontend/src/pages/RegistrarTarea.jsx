import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { registrarTareaConCalificaciones } from "../services/tareaCalificacionService";
import { listarCursos } from "../services/cursoService";
import "./RegistrarTarea.css";

function RegistrarTarea() {
  const [cargando, setCargando] = useState(false);
  const [cursos, setCursos] = useState([]);

  const [formulario, setFormulario] = useState({
    idCurso: "",
    titulo: "",
    descripcion: "",
    fechaEntrega: "",
    puntajeMaximo: "20",
    estado: "Tarea",
    grado: "",
    seccion: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await listarCursos();
      setCursos(response.data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    if (errores[name]) {
      setErrores({ ...errores, [name]: "" });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.idCurso) nuevosErrores.idCurso = "Seleccione un curso";
    if (!formulario.titulo) nuevosErrores.titulo = "Ingrese el titulo";
    if (!formulario.descripcion) nuevosErrores.descripcion = "Ingrese la descripcion";
    if (!formulario.fechaEntrega) nuevosErrores.fechaEntrega = "Seleccione la fecha de entrega";
    if (!formulario.puntajeMaximo) nuevosErrores.puntajeMaximo = "Ingrese el puntaje maximo";
    if (!formulario.grado) nuevosErrores.grado = "Ingrese el grado";
    if (!formulario.seccion) nuevosErrores.seccion = "Ingrese la seccion";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      Swal.fire("Campos incompletos", "Revise todos los campos obligatorios", "warning");
      return;
    }

    setCargando(true);

    try {
      const response = await registrarTareaConCalificaciones(formulario);
      const data = response.data;

      if (data.success) {
        Swal.fire({
          title: "Tarea Registrada",
          html: `
            <div style="text-align: left; padding: 10px;">
              <p><strong>Tarea:</strong> ${data.data.cursoNombre}</p>
              <p><strong>ID Tarea:</strong> ${data.data.idTarea}</p>
              <p><strong>Estudiantes:</strong> ${data.data.totalEstudiantes}</p>
              <p><strong>Calificaciones generadas:</strong> ${data.data.totalCalificaciones}</p>
              <hr/>
              <p style="color: #0d6944; font-weight: bold;">${data.mensaje}</p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#0d6944",
        });
        limpiarFormulario();
      } else {
        Swal.fire("Error", data.mensaje, "error");
      }
    } catch (error) {
      console.error("Error completo:", error);
      Swal.fire("Error", "No se pudo registrar la tarea", "error");
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      idCurso: "",
      titulo: "",
      descripcion: "",
      fechaEntrega: "",
      puntajeMaximo: "20",
      estado: "Tarea",
      grado: "",
      seccion: "",
    });
    setErrores({});
  };

  return (
    <div className="tarea-container">
      <Sidebar />

      <div className="tarea-main">
        {/* HEADER */}
        <div className="tarea-header">
          <div className="tarea-header-info">
            <h2>Registrar Tarea con Calificaciones</h2>
            <p>Procedimiento SQL con 5 tablas - C.E.P. La Sagrada Familia</p>
          </div>
          <div>
            <span className="badge-procedure">Procedimiento SQL</span>
          </div>
        </div>

        {/* INFORMACION DEL PROCEDIMIENTO */}
        <div className="tarea-procedure-info">
          <div className="tarea-procedure-card">
            <div className="tarea-procedure-icon">BD</div>
            <div className="tarea-procedure-details">
              <h5>fn_registrar_tarea_con_calificaciones</h5>
              <p>
                Funcion que inserta en <strong>5 tablas</strong>: tareas, cursos,
                estudiantes, calificaciones, matriculas. Crea una tarea y genera
                automaticamente calificaciones con nota 0 para todos los estudiantes
                del grado/seccion indicado.
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <form onSubmit={handleSubmit}>
              {/* SECCION: DATOS DE LA TAREA */}
              <div className="tarea-section">
                <div className="tarea-section-header">
                  <span className="section-number">1</span>
                  <h4>Datos de la Tarea</h4>
                </div>
                <div className="tarea-section-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="tarea-label">
                        Curso <span className="required">*</span>
                      </label>
                      <select
                        name="idCurso"
                        className={`tarea-select ${errores.idCurso ? "is-invalid" : ""}`}
                        value={formulario.idCurso}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione curso</option>
                        {cursos.map((c) => (
                          <option key={c.idCurso} value={c.idCurso}>
                            {c.nombre}
                          </option>
                        ))}
                      </select>
                      {errores.idCurso && <span className="error-text">{errores.idCurso}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="tarea-label">
                        Tipo <span className="required">*</span>
                      </label>
                      <select
                        name="estado"
                        className="tarea-select"
                        value={formulario.estado}
                        onChange={handleChange}
                      >
                        <option value="Tarea">Tarea</option>
                        <option value="Examen">Examen</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="tarea-label">
                        Puntaje Maximo <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        name="puntajeMaximo"
                        className={`tarea-input ${errores.puntajeMaximo ? "is-invalid" : ""}`}
                        placeholder="Ej: 20"
                        min="1"
                        max="100"
                        value={formulario.puntajeMaximo}
                        onChange={handleChange}
                      />
                      {errores.puntajeMaximo && <span className="error-text">{errores.puntajeMaximo}</span>}
                    </div>
                    <div className="col-md-6">
                      <label className="tarea-label">
                        Titulo <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="titulo"
                        className={`tarea-input ${errores.titulo ? "is-invalid" : ""}`}
                        placeholder="Titulo de la tarea o examen"
                        value={formulario.titulo}
                        onChange={handleChange}
                      />
                      {errores.titulo && <span className="error-text">{errores.titulo}</span>}
                    </div>
                    <div className="col-md-6">
                      <label className="tarea-label">
                        Fecha de Entrega <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        name="fechaEntrega"
                        className={`tarea-input ${errores.fechaEntrega ? "is-invalid" : ""}`}
                        value={formulario.fechaEntrega}
                        onChange={handleChange}
                      />
                      {errores.fechaEntrega && <span className="error-text">{errores.fechaEntrega}</span>}
                    </div>
                    <div className="col-md-12">
                      <label className="tarea-label">
                        Descripcion <span className="required">*</span>
                      </label>
                      <textarea
                        name="descripcion"
                        className={`tarea-textarea ${errores.descripcion ? "is-invalid" : ""}`}
                        placeholder="Descripcion de la tarea o examen"
                        value={formulario.descripcion}
                        onChange={handleChange}
                      />
                      {errores.descripcion && <span className="error-text">{errores.descripcion}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCION: DESTINO (GRADO Y SECCION) */}
              <div className="tarea-section">
                <div className="tarea-section-header">
                  <span className="section-number">2</span>
                  <h4>Destino - Grado y Seccion</h4>
                </div>
                <div className="tarea-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="tarea-label">
                        Grado <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="grado"
                        className={`tarea-input ${errores.grado ? "is-invalid" : ""}`}
                        placeholder="Ej: 3ERO, 5TO"
                        value={formulario.grado}
                        onChange={handleChange}
                      />
                      {errores.grado && <span className="error-text">{errores.grado}</span>}
                    </div>
                    <div className="col-md-6">
                      <label className="tarea-label">
                        Seccion <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="seccion"
                        className={`tarea-input ${errores.seccion ? "is-invalid" : ""}`}
                        placeholder="Ej: A, B, C"
                        value={formulario.seccion}
                        onChange={handleChange}
                      />
                      {errores.seccion && <span className="error-text">{errores.seccion}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="tarea-actions">
                <button
                  type="button"
                  className="btn-tarea-clear"
                  onClick={limpiarFormulario}
                  disabled={cargando}
                >
                  Limpiar Formulario
                </button>
                <button
                  type="submit"
                  className="btn-tarea-submit"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Procesando...
                    </>
                  ) : (
                    "Registrar Tarea"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarTarea;
