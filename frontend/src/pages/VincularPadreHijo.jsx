import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import { listarPadres } from "../services/padreService";
import { listarEstudiantes } from "../services/estudianteService";

import {
  listarVinculos,
  guardarVinculo,
  eliminarVinculo,
} from "../services/padreEstudianteService";

function VincularPadreHijo() {
  const [padres, setPadres] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [vinculos, setVinculos] = useState([]);

  const [idPadre, setIdPadre] = useState("");
  const [idEstudiante, setIdEstudiante] =
    useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const padresRes = await listarPadres();
      const estudiantesRes =
        await listarEstudiantes();
      const vinculosRes =
        await listarVinculos();

      setPadres(padresRes.data);
      setEstudiantes(estudiantesRes.data);
      setVinculos(vinculosRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const vincular = async () => {
    if (!idPadre || !idEstudiante) {
      alert(
        "Seleccione padre y estudiante"
      );
      return;
    }

    try {
      await guardarVinculo({
        padre: {
          idPadre: idPadre,
        },
        estudiante: {
          idEstudiante: idEstudiante,
        },
      });

      alert("Vínculo registrado");

      setIdPadre("");
      setIdEstudiante("");

      cargarDatos();
    } catch (error) {
      alert(
        error.response?.data ||
          "Error al vincular"
      );
    }
  };

  const eliminar = async (id) => {
    if (
      !window.confirm(
        "¿Eliminar vínculo?"
      )
    )
      return;

    await eliminarVinculo(id);

    cargarDatos();
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          padding: "40px",
          minWidth: "0",
        }}
      >
        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ backgroundColor: "transparent", paddingLeft: 0 }}>
            <li className="breadcrumb-item"><a href="/" style={{ color: "#115133", textDecoration: "none" }}>Inicio</a></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#115133" }}>Vincular Padre - Hijo</li>
          </ol>
        </nav>

        <div
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg,#115133 0%,#1a6b45 100%)",
            color: "#fff",
          }}
        >
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <h2 className="fw-extrabold m-0" style={{ letterSpacing: "-0.5px", fontSize: "26px" }}>
                Vincular Padre - Hijo
              </h2>
              <p className="text-white-50 small m-0 mt-2 fw-medium">
                Asocia padres y estudiantes para gestionar la familia escolar.
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center ms-lg-auto" style={{ minWidth: "220px" }}>
              <span
                className="badge px-3 py-2 fw-bold"
                style={{
                  backgroundColor: "#eef7f2",
                  color: "#115133",
                  borderRadius: "12px",
                }}
              >
                Padres: {padres.length}
              </span>
              <span
                className="badge px-3 py-2 fw-bold"
                style={{
                  backgroundColor: "#e6f7ff",
                  color: "#0c5460",
                  borderRadius: "12px",
                }}
              >
                Estudiantes: {estudiantes.length}
              </span>
              <span
                className="badge px-3 py-2 fw-bold"
                style={{
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  borderRadius: "12px",
                }}
              >
                Vínculos: {vinculos.length}
              </span>
            </div>
          </div>
        </div>

        <div
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "20px",
            backgroundColor: "#fff",
          }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: "#115133" }}>
                Vincular Padre e Hijo
              </h5>
              <p className="text-muted small mb-0">
                Completa los datos y registra la relación entre padre y estudiante.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label fw-bold">Padre o Madre</label>
              <select
                className="form-select"
                value={idPadre}
                onChange={(e) => setIdPadre(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {padres.map((p) => (
                  <option key={p.idPadre} value={p.idPadre}>
                    {p.nombres} {p.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-5">
              <label className="form-label fw-bold">Estudiante</label>
              <select
                className="form-select"
                value={idEstudiante}
                onChange={(e) => setIdEstudiante(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {estudiantes.map((estudiante) => (
                  <option key={estudiante.idEstudiante} value={estudiante.idEstudiante}>
                    {estudiante.nombres} {estudiante.apellidoPaterno}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-success w-100 text-white fw-bold"
                style={{ borderRadius: "12px", padding: "12px 0" }}
                onClick={vincular}
              >
                Vincular
              </button>
            </div>
          </div>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="p-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
            style={{
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div>
              <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "18px" }}>
                Relaciones Registradas
              </h5>
              <p className="text-muted small mb-0">Lista de vínculos padre-estudiante creados en el sistema.</p>
            </div>
            <span
              className="badge px-3 py-2 fw-bold"
              style={{
                backgroundColor: "#eef7f2",
                color: "#115133",
                borderRadius: "12px",
              }}
            >
              Total: {vinculos.length}
            </span>
          </div>

          <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
            <table className="table align-middle mb-0" style={{ minWidth: "740px" }}>
              <thead
                style={{
                  backgroundColor: "#f8f9fa",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  <th className="ps-4 py-3 text-secondary">ID</th>
                  <th className="text-secondary">Padre</th>
                  <th className="text-secondary">Estudiante</th>
                  <th className="text-center text-secondary">Acción</th>
                </tr>
              </thead>
              <tbody>
                {vinculos.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted fw-semibold">
                      No hay vínculos registrados.
                    </td>
                  </tr>
                ) : (
                  vinculos.map((v) => (
                    <tr key={v.idPadreEstudiante} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td className="ps-4 py-3">{v.idPadreEstudiante}</td>
                      <td>
                        <div className="fw-semibold">{v.padre?.nombres} {v.padre?.apellidos}</div>
                      </td>
                      <td>{v.estudiante?.nombres} {v.estudiante?.apellidoPaterno}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ borderRadius: "10px", minWidth: "95px" }}
                          onClick={() => eliminar(v.idPadreEstudiante)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VincularPadreHijo;