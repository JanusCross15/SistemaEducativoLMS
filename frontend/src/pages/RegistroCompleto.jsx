import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { registrarEstudianteCompleto } from "../services/registroService";
import "./RegistroCompleto.css";

function RegistroCompleto() {
  const [cargando, setCargando] = useState(false);

  const [formulario, setFormulario] = useState({
    nivel: "",
    grado: "",
    seccion: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    fechaNacimiento: "",
    provincia: "",
    departamento: "",
    distrito: "",
    sexo: "",
    dni: "",
    direccion: "",
    padreNombres: "",
    padreApellidos: "",
    padreDni: "",
    padreTelefono: "",
    padreDireccion: "",
    padreTipo: "PADRE",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    if (errores[name]) {
      setErrores({ ...errores, [name]: "" });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nivel) nuevosErrores.nivel = "Seleccione un nivel";
    if (!formulario.grado) nuevosErrores.grado = "Ingrese el grado";
    if (!formulario.seccion) nuevosErrores.seccion = "Ingrese la seccion";
    if (!formulario.nombres) nuevosErrores.nombres = "Ingrese los nombres";
    if (!formulario.apellidoPaterno) nuevosErrores.apellidoPaterno = "Ingrese el apellido paterno";
    if (!formulario.apellidoMaterno) nuevosErrores.apellidoMaterno = "Ingrese el apellido materno";
    if (!formulario.fechaNacimiento) nuevosErrores.fechaNacimiento = "Seleccione la fecha";
    if (!formulario.dni) nuevosErrores.dni = "Ingrese el DNI";
    if (!formulario.sexo) nuevosErrores.sexo = "Seleccione el sexo";
    if (!formulario.direccion) nuevosErrores.direccion = "Ingrese la direccion";
    if (!formulario.padreNombres) nuevosErrores.padreNombres = "Ingrese los nombres del padre";
    if (!formulario.padreApellidos) nuevosErrores.padreApellidos = "Ingrese los apellidos del padre";
    if (!formulario.padreDni) nuevosErrores.padreDni = "Ingrese el DNI del padre";
    if (!formulario.padreTelefono) nuevosErrores.padreTelefono = "Ingrese el telefono del padre";

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
      const response = await registrarEstudianteCompleto(formulario);
      console.log("Respuesta del backend:", response.data);
      const data = response.data;

      if (data.success) {
        Swal.fire({
          title: "Registro Exitoso",
          html: `
            <div style="text-align: left; padding: 10px;">
              <p><strong>Estudiante:</strong> ${data.data.codigoEstudiante}</p>
              <p><strong>ID Matricula:</strong> ${data.data.idMatricula}</p>
              <p><strong>ID Solicitud:</strong> ${data.data.idSolicitud}</p>
              <hr/>
              <p style="color: #28a745; font-weight: bold;">${data.mensaje}</p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#7a1b1b",
        });
        limpiarFormulario();
      } else {
        Swal.fire("Error", data.mensaje, "error");
      }
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del servidor:", error.response?.data);
      Swal.fire("Error", "No se pudo completar el registro", "error");
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nivel: "",
      grado: "",
      seccion: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      fechaNacimiento: "",
      provincia: "",
      departamento: "",
      distrito: "",
      sexo: "",
      dni: "",
      direccion: "",
      padreNombres: "",
      padreApellidos: "",
      padreDni: "",
      padreTelefono: "",
      padreDireccion: "",
      padreTipo: "PADRE",
    });
    setErrores({});
  };

  return (
    <div className="registro-container">
      <Sidebar />

      <div className="registro-main">
        {/* HEADER */}
        <div className="registro-header">
          <div className="registro-header-info">
            <h2>Registro Completo de Estudiante</h2>
            <p>Formulario con Procedimiento SQL - C.E.P. La Sagrada Familia</p>
          </div>
          <div className="registro-header-badge">
            <span className="badge-procedure">Procedimiento SQL</span>
          </div>
        </div>

        {/* INFORMACION DEL PROCEDIMIENTO */}
        <div className="registro-procedure-info">
          <div className="procedure-card">
            <div className="procedure-icon">BD</div>
            <div className="procedure-details">
              <h5>fn_registrar_estudiante_completo</h5>
              <p>Funcion que inserta en <strong>5 tablas</strong>: matriculas, estudiantes, padres, padre_estudiante, solicitudes_matricula</p>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <form onSubmit={handleSubmit}>
              {/* SECCION: DATOS DE MATRICULA */}
              <div className="registro-section">
                <div className="registro-section-header">
                  <span className="section-number">1</span>
                  <h4>Datos de Matricula</h4>
                </div>
                <div className="registro-section-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="registro-label">
                        Nivel <span className="required">*</span>
                      </label>
                      <select
                        name="nivel"
                        className={`registro-select ${errores.nivel ? "is-invalid" : ""}`}
                        value={formulario.nivel}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione nivel</option>
                        <option value="INICIAL">Inicial</option>
                        <option value="PRIMARIA">Primaria</option>
                        <option value="SECUNDARIA">Secundaria</option>
                      </select>
                      {errores.nivel && <span className="error-text">{errores.nivel}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Grado <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="grado"
                        className={`registro-input ${errores.grado ? "is-invalid" : ""}`}
                        placeholder="Ej: 3ERO, 5TO"
                        value={formulario.grado}
                        onChange={handleChange}
                      />
                      {errores.grado && <span className="error-text">{errores.grado}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Seccion <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="seccion"
                        className={`registro-input ${errores.seccion ? "is-invalid" : ""}`}
                        placeholder="Ej: A, B, C"
                        value={formulario.seccion}
                        onChange={handleChange}
                      />
                      {errores.seccion && <span className="error-text">{errores.seccion}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCION: DATOS DEL ESTUDIANTE */}
              <div className="registro-section">
                <div className="registro-section-header">
                  <span className="section-number">2</span>
                  <h4>Datos del Estudiante</h4>
                </div>
                <div className="registro-section-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="registro-label">
                        Nombres <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombres"
                        className={`registro-input ${errores.nombres ? "is-invalid" : ""}`}
                        placeholder="Nombres completos"
                        value={formulario.nombres}
                        onChange={handleChange}
                      />
                      {errores.nombres && <span className="error-text">{errores.nombres}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Apellido Paterno <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="apellidoPaterno"
                        className={`registro-input ${errores.apellidoPaterno ? "is-invalid" : ""}`}
                        placeholder="Apellido paterno"
                        value={formulario.apellidoPaterno}
                        onChange={handleChange}
                      />
                      {errores.apellidoPaterno && <span className="error-text">{errores.apellidoPaterno}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Apellido Materno <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="apellidoMaterno"
                        className={`registro-input ${errores.apellidoMaterno ? "is-invalid" : ""}`}
                        placeholder="Apellido materno"
                        value={formulario.apellidoMaterno}
                        onChange={handleChange}
                      />
                      {errores.apellidoMaterno && <span className="error-text">{errores.apellidoMaterno}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        DNI <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="dni"
                        className={`registro-input ${errores.dni ? "is-invalid" : ""}`}
                        placeholder="8 digitos"
                        maxLength="8"
                        value={formulario.dni}
                        onChange={handleChange}
                      />
                      {errores.dni && <span className="error-text">{errores.dni}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Fecha de Nacimiento <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        className={`registro-input ${errores.fechaNacimiento ? "is-invalid" : ""}`}
                        value={formulario.fechaNacimiento}
                        onChange={handleChange}
                      />
                      {errores.fechaNacimiento && <span className="error-text">{errores.fechaNacimiento}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">
                        Sexo <span className="required">*</span>
                      </label>
                      <select
                        name="sexo"
                        className={`registro-select ${errores.sexo ? "is-invalid" : ""}`}
                        value={formulario.sexo}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMENINO">Femenino</option>
                      </select>
                      {errores.sexo && <span className="error-text">{errores.sexo}</span>}
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">Departamento</label>
                      <input
                        type="text"
                        name="departamento"
                        className="registro-input"
                        placeholder="Departamento"
                        value={formulario.departamento}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">Provincia</label>
                      <input
                        type="text"
                        name="provincia"
                        className="registro-input"
                        placeholder="Provincia"
                        value={formulario.provincia}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="registro-label">Distrito</label>
                      <input
                        type="text"
                        name="distrito"
                        className="registro-input"
                        placeholder="Distrito"
                        value={formulario.distrito}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="registro-label">
                        Direccion <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        className={`registro-input ${errores.direccion ? "is-invalid" : ""}`}
                        placeholder="Direccion completa del estudiante"
                        value={formulario.direccion}
                        onChange={handleChange}
                      />
                      {errores.direccion && <span className="error-text">{errores.direccion}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCION: DATOS DEL PADRE/APODERADO */}
              <div className="registro-section">
                <div className="registro-section-header">
                  <span className="section-number">3</span>
                  <h4>Datos del Padre / Apoderado</h4>
                </div>
                <div className="registro-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="registro-label">
                        Nombres <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="padreNombres"
                        className={`registro-input ${errores.padreNombres ? "is-invalid" : ""}`}
                        placeholder="Nombres del padre/apoderado"
                        value={formulario.padreNombres}
                        onChange={handleChange}
                      />
                      {errores.padreNombres && <span className="error-text">{errores.padreNombres}</span>}
                    </div>
                    <div className="col-md-6">
                      <label className="registro-label">
                        Apellidos <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="padreApellidos"
                        className={`registro-input ${errores.padreApellidos ? "is-invalid" : ""}`}
                        placeholder="Apellidos del padre/apoderado"
                        value={formulario.padreApellidos}
                        onChange={handleChange}
                      />
                      {errores.padreApellidos && <span className="error-text">{errores.padreApellidos}</span>}
                    </div>
                    <div className="col-md-3">
                      <label className="registro-label">
                        DNI <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="padreDni"
                        className={`registro-input ${errores.padreDni ? "is-invalid" : ""}`}
                        placeholder="8 digitos"
                        maxLength="8"
                        value={formulario.padreDni}
                        onChange={handleChange}
                      />
                      {errores.padreDni && <span className="error-text">{errores.padreDni}</span>}
                    </div>
                    <div className="col-md-3">
                      <label className="registro-label">
                        Telefono <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="padreTelefono"
                        className={`registro-input ${errores.padreTelefono ? "is-invalid" : ""}`}
                        placeholder="9 digitos"
                        maxLength="9"
                        value={formulario.padreTelefono}
                        onChange={handleChange}
                      />
                      {errores.padreTelefono && <span className="error-text">{errores.padreTelefono}</span>}
                    </div>
                    <div className="col-md-3">
                      <label className="registro-label">Tipo</label>
                      <select
                        name="padreTipo"
                        className="registro-select"
                        value={formulario.padreTipo}
                        onChange={handleChange}
                      >
                        <option value="PADRE">Padre</option>
                        <option value="MADRE">Madre</option>
                        <option value="APODERADO">Apoderado</option>
                        <option value="TUTOR">Tutor</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="registro-label">Direccion</label>
                      <input
                        type="text"
                        name="padreDireccion"
                        className="registro-input"
                        placeholder="Direccion del padre"
                        value={formulario.padreDireccion}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="registro-actions">
                <button
                  type="button"
                  className="btn-registro-clear"
                  onClick={limpiarFormulario}
                  disabled={cargando}
                >
                  Limpiar Formulario
                </button>
                <button
                  type="submit"
                  className="btn-registro-submit"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Procesando...
                    </>
                  ) : (
                    "Registrar Estudiante"
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

export default RegistroCompleto;
