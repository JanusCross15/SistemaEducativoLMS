import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  listarMatriculas,
  guardarMatricula,
  actualizarMatricula,
  eliminarMatricula
} from "../services/matriculaService";

function Matriculas() {

  const [matriculas, setMatriculas] = useState([]);

  const [formData, setFormData] = useState({
    nivel: "",
    grado: "",
    seccion: "",
    dni: "",
    celular: ""
  });

  const [editando, setEditando] = useState(false);

  const [idMatricula, setIdMatricula] = useState(null);

  useEffect(() => {
    obtenerMatriculas();
  }, []);

  // LISTAR

  const obtenerMatriculas = async () => {

    const response = await listarMatriculas();

    setMatriculas(response.data);
  };

  // INPUTS

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // GUARDAR

  const registrarMatricula = async (e) => {

    e.preventDefault();

    if (editando) {

      await actualizarMatricula(
        idMatricula,
        formData
      );

    } else {

      await guardarMatricula(formData);
    }

    obtenerMatriculas();

    limpiarFormulario();
  };

  // EDITAR

  const editarMatricula = (matricula) => {

    setFormData({
      nivel: matricula.nivel,
      grado: matricula.grado,
      seccion: matricula.seccion,
      dni: matricula.dni,
      celular: matricula.celular
    });

    setEditando(true);

    setIdMatricula(matricula.idMatricula);
  };

  // ELIMINAR

  const eliminarRegistro = async (id) => {

    if (window.confirm("¿Eliminar matrícula?")) {

      await eliminarMatricula(id);

      obtenerMatriculas();
    }
  };

  // LIMPIAR

  const limpiarFormulario = () => {

    setFormData({
      nivel: "",
      grado: "",
      seccion: "",
      dni: "",
      celular: ""
    });

    setEditando(false);

    setIdMatricula(null);
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

          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              Gestión de Matrículas
            </h3>
          </div>

          <div className="card-body">

            <form
              onSubmit={registrarMatricula}
              className="card p-4 shadow-sm mb-4 border-0"
            >

              <div className="row">

                <div className="col-md-4 mb-3">

                  <select
                    name="nivel"
                    className="form-select"
                    value={formData.nivel}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione nivel
                    </option>

                    <option value="Primaria">
                      Primaria
                    </option>

                    <option value="Secundaria">
                      Secundaria
                    </option>

                  </select>

                </div>

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="grado"
                    placeholder="Grado"
                    className="form-control"
                    value={formData.grado}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="seccion"
                    placeholder="Sección"
                    className="form-control"
                    value={formData.seccion}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="dni"
                    placeholder="DNI"
                    className="form-control"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="celular"
                    placeholder="Celular"
                    className="form-control"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="d-flex gap-2">

                <button
                  className={`btn ${
                    editando
                      ? "btn-warning"
                      : "btn-success"
                  }`}
                >

                  {editando
                    ? "Actualizar Matrícula"
                    : "Registrar Matrícula"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={limpiarFormulario}
                >
                  Limpiar
                </button>

              </div>

            </form>

            <table className="table table-hover table-bordered shadow-sm">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Nivel</th>
                  <th>Grado</th>
                  <th>Sección</th>
                  <th>DNI</th>
                  <th>Celular</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {matriculas.map((matricula) => (

                  <tr key={matricula.idMatricula}>

                    <td>{matricula.idMatricula}</td>

                    <td>{matricula.nivel}</td>

                    <td>{matricula.grado}</td>

                    <td>{matricula.seccion}</td>

                    <td>{matricula.dni}</td>

                    <td>{matricula.celular}</td>

                    <td>{matricula.fechaMatricula}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editarMatricula(matricula)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminarRegistro(
                            matricula.idMatricula
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Matriculas;