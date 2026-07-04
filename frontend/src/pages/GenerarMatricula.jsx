import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import { listarEstudiantes } from "../services/estudianteService";

import axios from "axios";

function GenerarMatricula() {

  const [estudiantes, setEstudiantes] = useState([]);

  const [idEstudiante, setIdEstudiante] = useState("");

  const obtenerEstudiantes = async () => {
    try {
      const response = await listarEstudiantes();
      const data = response && response.data ? response.data : [];
      // si viene paginado, devolver content
      if (data && data.content) return data.content;
      if (Array.isArray(data)) return data;
      return [];
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      return [];
    }
  };

  useEffect(() => {
    let activo = true;

    (async () => {
      const data = await obtenerEstudiantes();
      if (activo) setEstudiantes(data);
    })();

    return () => {
      activo = false;
    };
  }, []);

  const generarPdf = async () => {

    if (!idEstudiante) {

      alert("Seleccione estudiante");

      return;
    }

    try {

      const response = await axios.get(
        `http://localhost:8081/api/pdf/matricula/${idEstudiante}`,
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "ficha_matricula.pdf"
      );

      document.body.appendChild(link);

      link.click();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div
      style={{
        display: "flex",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          padding: "30px",
        }}
      >

        <div className="card shadow-lg border-0">

          <div className="card-header bg-danger text-white">

            <h3>
              Generar Ficha de Matrícula
            </h3>

          </div>

          <div className="card-body">

            <div className="mb-4">

              <label className="form-label">
                Seleccione Estudiante
              </label>

              <select
                className="form-select"
                value={idEstudiante}
                onChange={(e) =>
                  setIdEstudiante(e.target.value)
                }
              >

                <option value="">
                  Seleccione
                </option>

                {estudiantes.map((estudiante) => (

                  <option
                    key={estudiante.idEstudiante}
                    value={estudiante.idEstudiante}
                  >

                    {estudiante.nombres}{" "}
                    {estudiante.apellidoPaterno}

                  </option>

                ))}

              </select>

            </div>

            <button
              className="btn btn-danger"
              onClick={generarPdf}
            >

              Generar PDF

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default GenerarMatricula;