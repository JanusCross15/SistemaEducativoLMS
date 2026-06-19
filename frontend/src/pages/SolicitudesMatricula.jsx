import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  listarSolicitudes,
  registrarSolicitud,
  eliminarSolicitud,
  aprobarSolicitud,
  rechazarSolicitud,
  listarPadres,
  listarEstudiantes,
} from "../services/solicitudMatriculaService";

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  const [padres, setPadres] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [solicitudSeleccionada,
    setSolicitudSeleccionada] = useState(null);

  const [form, setForm] = useState({
    padre: {
      idPadre: "",
    },
    estudiante: {
      idEstudiante: "",
    },
    observacion: "",
  });

  // ===========================
  // CARGAR DATOS
  // ===========================

  const cargarDatos = async () => {
    try {
      const [
        solicitudesRes,
        padresRes,
        estudiantesRes,
      ] = await Promise.all([
        listarSolicitudes(),
        listarPadres(),
        listarEstudiantes(),
      ]);

      setSolicitudes(solicitudesRes.data);
      setPadres(padresRes.data);
      setEstudiantes(estudiantesRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // ===========================
  // INPUTS
  // ===========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "idPadre") {

      setForm({
        ...form,
        padre: {
          idPadre: value,
        },
      });

    } else if (name === "idEstudiante") {

      setForm({
        ...form,
        estudiante: {
          idEstudiante: value,
        },
      });

    } else {

      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // ===========================
  // REGISTRAR
  // ===========================

  const guardarSolicitud = async (e) => {

    e.preventDefault();

    try {

      await registrarSolicitud(form);

      limpiarFormulario();

      setMostrarFormulario(false);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // APROBAR
  // ===========================

  const aprobar = async (id) => {

    try {

      await aprobarSolicitud(id);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // RECHAZAR
  // ===========================

  const rechazar = async (id) => {

    try {

      await rechazarSolicitud(id);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // ELIMINAR
  // ===========================

  const eliminar = async (id) => {

    if (
      window.confirm(
        "¿Deseas eliminar esta solicitud?"
      )
    ) {

      try {

        await eliminarSolicitud(id);

        cargarDatos();

      } catch (error) {

        console.error(error);
      }
    }
  };

  // ===========================
  // LIMPIAR
  // ===========================

  const limpiarFormulario = () => {

    setForm({
      padre: {
        idPadre: "",
      },
      estudiante: {
        idEstudiante: "",
      },
      observacion: "",
    });
  };
    return (
    <div
      style={{
        display: "flex",
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          padding: "40px",
        }}
      >

        {/* CABECERA */}

        <div
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#115133 0%,#1a6b45 100%)",
            color: "#fff",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
          >

            <div>
              <h2 className="fw-bold m-0">
                Solicitudes de Matrícula
              </h2>

              <p className="text-white-50 m-0">
                Gestión de solicitudes
              </p>
            </div>

            <button
              className="btn btn-light fw-bold"
              onClick={() =>
                setMostrarFormulario(
                  !mostrarFormulario
                )
              }
            >
              {mostrarFormulario
                ? "Cancelar"
                : "Nueva Solicitud"}
            </button>

          </div>
        </div>

        {/* FORMULARIO */}

        {mostrarFormulario && (

          <div
            className="card border-0 shadow-sm p-4 mb-4"
            style={{
              borderRadius: "20px",
            }}
          >
            <h4 className="mb-4">
              Registrar Solicitud
            </h4>

            <form
              onSubmit={registrarSolicitud}
            >

              <div className="row g-3">

                <div className="col-md-6">
                  <label>
                    Padre
                  </label>

                  <select
                    className="form-select"
                    name="idPadre"
                    value={
                      form.padre.idPadre
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >
                    <option value="">
                      Seleccione
                    </option>

                    {padres.map(
                      (p) => (
                        <option
                          key={
                            p.idPadre
                          }
                          value={
                            p.idPadre
                          }
                        >
                          {p.nombres}
                          {" "}
                          {p.apellidos}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="col-md-6">
                  <label>
                    Estudiante
                  </label>

                  <select
                    className="form-select"
                    name="idEstudiante"
                    value={
                      form.estudiante
                        .idEstudiante
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >
                    <option value="">
                      Seleccione
                    </option>

                    {estudiantes.map(
                      (e) => (
                        <option
                          key={
                            e.idEstudiante
                          }
                          value={
                            e.idEstudiante
                          }
                        >
                          {e.nombres}
                          {" "}
                          {e.apellidoPaterno}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="col-12">
                  <label>
                    Observación
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="observacion"
                    value={
                      form.observacion
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

              </div>

              <div className="mt-4">

                <button
                  className="btn text-white"
                  style={{
                    background:
                      "#115133",
                  }}
                >
                  Registrar
                </button>

              </div>

            </form>
          </div>
        )}
                <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >

          <div className="p-4">

            <h5>
              Solicitudes Registradas
            </h5>

            <span
              className="badge"
              style={{
                background:
                  "#eef7f2",
                color: "#115133",
              }}
            >
              Total: {solicitudes.length}
            </span>

          </div>

          <div className="table-responsive">

            <table className="table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Padre</th>
                  <th>Estudiante</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {solicitudes.map(
                  (s) => (

                    <tr
                      key={
                        s.idSolicitud
                      }
                    >

                      <td>
                        {
                          s.idSolicitud
                        }
                      </td>

                      <td>
                        {
                          s.padre
                            ?.nombres
                        }{" "}
                        {
                          s.padre
                            ?.apellidos
                        }
                      </td>

                      <td>
                        {
                          s.estudiante
                            ?.nombres
                        }{" "}
                        {
                          s.estudiante
                            ?.apellidoPaterno
                        }
                      </td>

                      <td>
                        {
                          s.fechaSolicitud
                        }
                      </td>

                      <td>

                        <span
                          className="badge"
                          style={{
                            background:
                              s.estado ===
                              "APROBADA"
                                ? "#d4edda"
                                : s.estado ===
                                  "RECHAZADA"
                                ? "#f8d7da"
                                : "#fff3cd",

                            color:
                              s.estado ===
                              "APROBADA"
                                ? "#155724"
                                : s.estado ===
                                  "RECHAZADA"
                                ? "#721c24"
                                : "#856404",
                          }}
                        >
                          {s.estado}
                        </span>

                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              aprobar(
                                s.idSolicitud
                              )
                            }
                          >
                            Aprobar
                          </button>

                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              rechazar(
                                s.idSolicitud
                              )
                            }
                          >
                            Rechazar
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              eliminar(
                                s.idSolicitud
                              )
                            }
                          >
                            Eliminar
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Solicitudes;