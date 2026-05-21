import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  listarPadres,
  guardarPadre,
  actualizarPadre,
  eliminarPadre,
} from "../services/padreService";

import { listarEstudiantes } from "../services/estudianteService";

function Padres() {

  const [padres, setPadres] = useState([]);

  const [estudiantes, setEstudiantes] = useState([]);

  const [formData, setFormData] = useState({

    nombres: "",
    apellidos: "",

    dni: "",
    telefono: "",

    direccion: "",

    tipo: "",

    estudiante: {
      idEstudiante: ""
    }

  });

  const [editando, setEditando] = useState(false);

  const [idPadre, setIdPadre] = useState(null);

  useEffect(() => {

    obtenerPadres();

    obtenerEstudiantes();

  }, []);

  // LISTAR PADRES

  const obtenerPadres = async () => {

    const response = await listarPadres();

    setPadres(response.data);
  };

  // LISTAR ESTUDIANTES

  const obtenerEstudiantes = async () => {

    const response = await listarEstudiantes();

    setEstudiantes(response.data);
  };

  // INPUTS

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "idEstudiante") {

      setFormData({
        ...formData,

        estudiante: {
          idEstudiante: value
        }
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // GUARDAR

  const registrarPadre = async (e) => {

    e.preventDefault();

    if (editando) {

      await actualizarPadre(idPadre, formData);

    } else {

      await guardarPadre(formData);
    }

    obtenerPadres();

    limpiarFormulario();
  };

  // EDITAR

  const editarPadre = (padre) => {

    setFormData({

      nombres: padre.nombres,
      apellidos: padre.apellidos,

      dni: padre.dni,
      telefono: padre.telefono,

      direccion: padre.direccion,

      tipo: padre.tipo,

      estudiante: {
        idEstudiante:
          padre.estudiante?.idEstudiante || ""
      }

    });

    setEditando(true);

    setIdPadre(padre.idPadre);
  };

  // ELIMINAR

  const eliminarRegistro = async (id) => {

    if (window.confirm("¿Eliminar registro?")) {

      await eliminarPadre(id);

      obtenerPadres();
    }
  };

  // LIMPIAR

  const limpiarFormulario = () => {

    setFormData({

      nombres: "",
      apellidos: "",

      dni: "",
      telefono: "",

      direccion: "",

      tipo: "",

      estudiante: {
        idEstudiante: ""
      }

    });

    setEditando(false);

    setIdPadre(null);
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

          <div className="card-header bg-info text-white">
            <h3 className="mb-0">
              Gestión de Padres
            </h3>
          </div>

          <div className="card-body">

            {/* FORMULARIO */}

            <form
              onSubmit={registrarPadre}
              className="card p-4 shadow-sm mb-4 border-0"
            >

              <div className="row">

                {/* ESTUDIANTE */}

                <div className="col-md-6 mb-3">

                  <select
                    name="idEstudiante"
                    className="form-select"
                    value={
                      formData.estudiante.idEstudiante
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione estudiante
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

                {/* TIPO */}

                <div className="col-md-6 mb-3">

                  <select
                    name="tipo"
                    className="form-select"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione tipo
                    </option>

                    <option value="Padre">
                      Padre
                    </option>

                    <option value="Madre">
                      Madre
                    </option>

                  </select>

                </div>

                {/* NOMBRES */}

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    placeholder="Nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* APELLIDOS */}

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    placeholder="Apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* DNI */}

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="dni"
                    className="form-control"
                    placeholder="DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* TELEFONO */}

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* DIRECCION */}

                <div className="col-md-12 mb-3">

                  <input
                    type="text"
                    name="direccion"
                    className="form-control"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* BOTONES */}

              <div className="d-flex gap-2">

                <button
                  className={`btn ${
                    editando
                      ? "btn-warning"
                      : "btn-info"
                  }`}
                >

                  {editando
                    ? "Actualizar"
                    : "Registrar"}

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

            {/* TABLA */}

            <table className="table table-hover table-bordered shadow-sm">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Estudiante</th>
                  <th>Tipo</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>DNI</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {padres.map((padre) => (

                  <tr key={padre.idPadre}>

                    <td>{padre.idPadre}</td>

                    <td>

                      {padre.estudiante?.nombres}{" "}
                      {padre.estudiante?.apellidoPaterno}

                    </td>

                    <td>{padre.tipo}</td>

                    <td>{padre.nombres}</td>

                    <td>{padre.apellidos}</td>

                    <td>{padre.dni}</td>

                    <td>{padre.telefono}</td>

                    <td>{padre.direccion}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editarPadre(padre)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminarRegistro(
                            padre.idPadre
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

export default Padres;