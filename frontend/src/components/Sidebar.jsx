import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaUserFriends,
  FaFilePdf,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaBullhorn,
  FaComments,
  FaFileExcel,
  FaUserCog,
} from "react-icons/fa";

import "./Sidebar.css";
import logoColegio from "../assets/IconColegio.ico";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* LOGO */}

      <div className="sidebar-header">
        <img src={logoColegio} alt="Logo Colegio" className="sidebar-logo" />

        <h3>Colegio INEI 46</h3>

        <p>LMS Académico</p>
      </div>

      {/* MENU */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "10px",
        }}
      >
        <MenuItem
          icon={<FaUsers />}
          text="Dashboard"
          onClick={() => navigate("/dashboard")}
        />

        <MenuSection title="Gestión Académica" />

        <MenuItem
          icon={<FaBook />}
          text="Cursos"
          onClick={() => navigate("/cursos")}
        />

        <MenuItem
          icon={<FaUserGraduate />}
          text="Estudiantes"
          onClick={() => navigate("/estudiantes")}
        />

        <MenuItem
          icon={<FaChalkboardTeacher />}
          text="Docentes"
          onClick={() => navigate("/docentes")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Matrículas"
          onClick={() => navigate("/matriculas")}
        />

        <MenuSection title="Gestión Escolar" />

        <MenuItem
          icon={<FaTasks />}
          text="Asignaciones"
          onClick={() => navigate("/asignaciones")}
        />

        <MenuItem
          icon={<FaCalendarAlt />}
          text="Horarios"
          onClick={() => navigate("/horarios")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Evaluaciones"
          onClick={() => navigate("/evaluaciones")}
        />

        <MenuSection title="Usuarios" />

        <MenuItem
          icon={<FaUserFriends />}
          text="Padres"
          onClick={() => navigate("/padres")}
        />

        <MenuItem
          icon={<FaUserCog />}
          text="Usuarios"
          onClick={() => navigate("/usuarios")}
        />

        <MenuItem
          icon={<FaLink />}
          text="Vincular Padre-Hijo"
          onClick={() => navigate("/vincular-padre-hijo")}
        />

        <MenuSection title="Procesos" />

        <MenuItem
          icon={<FaClipboardList />}
          text="Solicitudes de Matrícula"
          onClick={() => navigate("/solicitudes")}
        />

        <MenuItem
          icon={<FaBullhorn />}
          text="Comunicados"
          onClick={() => navigate("/comunicados")}
        />

        <MenuItem
          icon={<FaComments />}
          text="Observaciones"
          onClick={() => navigate("/observaciones")}
        />

        <MenuSection title="Reportes" />

        <MenuItem
          icon={<FaFilePdf />}
          text="Reportes PDF"
          onClick={() => navigate("/reportes-pdf")}
        />

        <MenuItem
          icon={<FaFileExcel />}
          text="Reportes Excel"
          onClick={() => navigate("/reportes-excel")}
        />

        <MenuItem
          icon={<FaFilePdf />}
          text="Generar Matrícula"
          onClick={() => navigate("/generar-matricula")}
        />
      </div>

      {/* FOOTER */}

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          className="btn btn-danger w-100"
          style={{
            borderRadius: "10px",
          }}
          onClick={() => {
            localStorage.removeItem("usuario");
            navigate("/");
          }}
        >
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

function MenuSection({ title }) {
  return <div className="menu-section">{title}</div>;
}

function MenuItem({ icon, text, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      {icon}
      {text}
    </div>
  );
}

export default Sidebar;
