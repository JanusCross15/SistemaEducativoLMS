import {
  FaBars,
  FaBook,
  FaBullhorn,
  FaChartLine,
  FaHome,
  FaRegCalendarAlt,
  FaFolder,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import logoColegio from "../assets/IconColegio.ico";
import "./SidebarEstudiante.css";

function SidebarEstudiante({ onNavigate, onLogout, vistaActiva }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar-estudiante ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-estudiante-topbar">
        <button
          type="button"
          className="sidebar-estudiante-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Contraer menú"
        >
          <FaBars />
        </button>
      </div>

      <div className="sidebar-estudiante-brand">
        <img src={logoColegio} alt="Logo colegio" />
        {!collapsed && (
          <div>
            <p className="sidebar-estudiante-kicker">Portal Estudiante</p>
            <h2>C.E.P. La Sagrada Familia</h2>
          </div>
        )}
      </div>

      <nav className="sidebar-estudiante-menu">
        <SidebarLink
          collapsed={collapsed}
          icon={<FaHome />}
          label="Resumen"
          active={vistaActiva === "resumen"}
          onClick={() => onNavigate("resumen")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaBook />}
          label="Mis cursos"
          active={vistaActiva === "cursos"}
          onClick={() => onNavigate("cursos")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaChartLine />}
          label="Calificaciones"
          active={vistaActiva === "calificaciones"}
          onClick={() => onNavigate("calificaciones")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaTasks />}
          label="Tareas"
          active={vistaActiva === "tareas"}
          onClick={() => onNavigate("tareas")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaFolder />}
          label="Materiales"
          active={vistaActiva === "materiales"}
          onClick={() => onNavigate("materiales")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaRegCalendarAlt />}
          label="Horario"
          active={vistaActiva === "horario"}
          onClick={() => onNavigate("horario")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaBullhorn />}
          label="Comunicados"
          active={vistaActiva === "comunicados"}
          onClick={() => onNavigate("comunicados")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaUser />}
          label="Mi perfil"
          active={vistaActiva === "perfil"}
          onClick={() => onNavigate("perfil")}
        />
      </nav>

      <div className="sidebar-estudiante-footer">
        <button
          type="button"
          className="sidebar-estudiante-logout"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, onClick, collapsed, active }) {
  return (
    <button
      type="button"
      className={`sidebar-estudiante-link ${active ? "active" : ""}`}
      onClick={onClick}
      title={collapsed ? label : ""}
    >
      <span className="sidebar-estudiante-icon">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

export default SidebarEstudiante;
