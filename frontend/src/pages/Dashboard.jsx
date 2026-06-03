import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import { obtenerResumen } from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    matriculas: 0,
  });

  useEffect(() => {
    cargarResumen();
  }, []);

  const cargarResumen = async () => {
    try {
      const response = await obtenerResumen();

      setResumen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENIDO */}

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "270px",
        }}
      >
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="dashboard-title">Dashboard Administrativo</h1>

            <p className="dashboard-subtitle">
              Bienvenido al Sistema Educativo LMS
            </p>
          </div>

          <div className="welcome-card">👋 Admin</div>
        </div>

        {/* TARJETAS */}

        <div className="row">
          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Estudiantes"
              numero={resumen.estudiantes}
              color="#2563eb"
              icon={<FaUserGraduate />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Docentes"
              numero={resumen.docentes}
              color="#16a34a"
              icon={<FaChalkboardTeacher />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Cursos"
              numero={resumen.cursos}
              color="#f59e0b"
              icon={<FaBook />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Matrículas"
              numero={resumen.matriculas}
              color="#dc2626"
              icon={<FaClipboardList />}
            />
          </div>
        </div>

        {/* TABLA */}

        <div
          className="card shadow border-0 mt-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            <h4
              className="mb-4"
              style={{
                fontWeight: "bold",
              }}
            >
              Resumen General del Sistema
            </h4>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Estudiantes</td>

                  <td>{resumen.estudiantes}</td>

                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                </tr>

                <tr>
                  <td>Docentes</td>

                  <td>{resumen.docentes}</td>

                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                </tr>

                <tr>
                  <td>Cursos</td>

                  <td>{resumen.cursos}</td>

                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                </tr>

                <tr>
                  <td>Matrículas</td>

                  <td>{resumen.matriculas}</td>

                  <td>
                    <span className="badge bg-primary">Registradas</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE CARD */

function CardDashboard({ titulo, numero, color, icon }) {
  return (
    <div
      className="card-dashboard"
      style={{
        background: color,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            {numero}
          </h2>

          <h5>{titulo}</h5>
        </div>

        <div
          style={{
            fontSize: "45px",
            opacity: 0.3,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
