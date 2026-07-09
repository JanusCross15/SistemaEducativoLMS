import { useEffect, useState } from "react";
import {
  FaBook,
  FaBookOpen,
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFilePdf,
  FaFolder,
  FaHome,
  FaLayerGroup,
  FaRegCalendarAlt,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SidebarEstudiante from "../components/SidebarEstudiante";
import {
  obtenerEstudiantePorUsuario,
  listarCalificacionesEstudiante,
  listarTareasPorCurso,
  listarMaterialesPorCurso,
  listarCursos,
} from "../services/estudiantePortalService";
import "./DashboardEstudiante.css";

const HORARIO_MOCK = [
  { hora: "07:00 - 07:45", lunes: "Matemáticas", martes: "Comunicación", miercoles: "Matemáticas", jueves: "Comunicación", viernes: "Ciencias" },
  { hora: "07:45 - 08:30", lunes: "Matemáticas", martes: "Comunicación", miercoles: "Matemáticas", jueves: "Comunicación", viernes: "Ciencias" },
  { hora: "08:30 - 09:15", lunes: "Ingles", martes: "Matemáticas", miercoles: "Ingles", jueves: "Matemáticas", viernes: "Personal Social" },
  { hora: "09:15 - 09:45", lunes: "RECESO", martes: "RECESO", miercoles: "RECESO", jueves: "RECESO", viernes: "RECESO" },
  { hora: "09:45 - 10:30", lunes: "Ingles", martes: "Matemáticas", miercoles: "Ingles", jueves: "Matemáticas", viernes: "Personal Social" },
  { hora: "10:30 - 11:15", lunes: "Ciencias", martes: "Religión", miercoles: "Ciencias", jueves: "Religión", viernes: "Arte" },
  { hora: "11:15 - 12:00", lunes: "Ciencias", martes: "Religión", miercoles: "Ciencias", jueves: "Religión", viernes: "Arte" },
  { hora: "12:00 - 12:45", lunes: "Personal Social", martes: "Educación Física", miercoles: "Personal Social", jueves: "Educación Física", viernes: "Comunicación" },
  { hora: "12:45 - 13:30", lunes: "Personal Social", martes: "Educación Física", miercoles: "Personal Social", jueves: "Educación Física", viernes: "Comunicación" },
];

const COMUNICADOS_MOCK = [
  {
    id: 1,
    titulo: "Reunión de Padres de Familia",
    fecha: "11/07/2026",
    prioridad: "Alta",
    desc: "Se realizará la reunión general de padres de familia el viernes 11 de julio a las 4:00 pm en el auditorio.",
  },
  {
    id: 2,
    titulo: "Semana de Exámenes Finales",
    fecha: "07/07/2026",
    prioridad: "Alta",
    desc: "Las evaluaciones finales del segundo bimestre se realizarán del 14 al 18 de julio. Prepararse adecuadamente.",
  },
  {
    id: 3,
    titulo: "Mantenimiento de la Plataforma LMS",
    fecha: "05/07/2026",
    prioridad: "Media",
    desc: "El sistema entrará en mantenimiento este sábado de 11 pm a 2 am. Se recomienda guardar su trabajo.",
  },
  {
    id: 4,
    titulo: "Coloquio de Ciencias",
    fecha: "01/07/2026",
    prioridad: "Baja",
    desc: "El coloquio de ciencias se realizará el 20 de julio. Inscribirse con su docente antes del 15 de julio.",
  },
];

const formatearFecha = (valor) => {
  if (!valor) return "";
  const fecha =
    valor instanceof Date
      ? valor
      : new Date(typeof valor === "string" && !valor.includes("T") ? `${valor}T00:00:00` : valor);
  if (Number.isNaN(fecha.getTime())) return String(valor);
  return fecha.toLocaleDateString("es-PE");
};

function DashboardEstudiante() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState("resumen");
  const [cargando, setCargando] = useState(true);
  const [errorBackend, setErrorBackend] = useState("");

  const [estudiante, setEstudiante] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [comunicados] = useState(COMUNICADOS_MOCK);
  const [horario] = useState(HORARIO_MOCK);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const obtenerUsuario = () => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || { nombre: "Estudiante" };
    } catch {
      return { nombre: "Estudiante" };
    }
  };
  const usuario = obtenerUsuario();

  useEffect(() => {
    const cargarDatos = async () => {
      const idUsuario = usuario.idUsuario;
      if (!idUsuario) {
        setErrorBackend("No se encontró la sesión del usuario.");
        setCargando(false);
        return;
      }

      // Paso 1: Cursos (independiente del estudiante)
      let cursosData = [];
      try {
        const cursosRes = await listarCursos();
        cursosData = cursosRes.data || [];
        setCursos(cursosData);
      } catch {
        console.warn("No se pudieron cargar los cursos.");
      }

      // Paso 2: Estudiante por usuario
      let estudianteData = null;
      try {
        const estudianteRes = await obtenerEstudiantePorUsuario(idUsuario);
        estudianteData = estudianteRes.data;
        setEstudiante(estudianteData);
      } catch {
        console.warn("No se encontró registro de estudiante para este usuario.");
        setErrorBackend("No se encontró un registro de estudiante vinculado a esta cuenta.");
        setCargando(false);
        return;
      }

      // Paso 3: Calificaciones
      try {
        const calificacionesRes = await listarCalificacionesEstudiante(estudianteData.idEstudiante);
        setCalificaciones(calificacionesRes.data || []);

        // Paso 4: Tareas y materiales por curso del estudiante
        const cursosCalificados = [...new Set((calificacionesRes.data || []).map((c) => c.nombreCurso))];
        const cursosIdsEstudiante = cursosData
          .filter((curso) => cursosCalificados.includes(curso.nombre))
          .map((curso) => curso.idCurso);

        if (cursosIdsEstudiante.length > 0) {
          const tareasPromises = cursosIdsEstudiante.map((id) =>
            listarTareasPorCurso(id).catch(() => ({ data: [] }))
          );
          const materialesPromises = cursosIdsEstudiante.map((id) =>
            listarMaterialesPorCurso(id).catch(() => ({ data: [] }))
          );
          const [tareasResults, materialesResults] = await Promise.all([
            Promise.all(tareasPromises),
            Promise.all(materialesPromises),
          ]);
          setTareas(tareasResults.flatMap((r) => r.data || []));
          setMateriales(materialesResults.flatMap((r) => r.data || []));
        }
      } catch {
        console.warn("Error cargando calificaciones del estudiante.");
      }

      setErrorBackend("");
      setCargando(false);
    };

    cargarDatos();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const promedioGeneral =
    calificaciones.length > 0
      ? (calificaciones.reduce((sum, c) => sum + Number(c.nota), 0) / calificaciones.length).toFixed(1)
      : "0.0";

  const cursosUnicos = (() => {
    const mapa = new Map();
    for (const c of calificaciones) {
      if (!mapa.has(c.nombreCurso)) {
        mapa.set(c.nombreCurso, { nombre: c.nombreCurso, notas: [] });
      }
      mapa.get(c.nombreCurso).notas.push(c);
    }
    for (const curso of cursos) {
      if (!mapa.has(curso.nombre)) {
        mapa.set(curso.nombre, { nombre: curso.nombre, notas: [] });
      }
    }
    return [...mapa.values()];
  })();

  const tareasPendientes = tareas.filter((t) => t.estado === "Pendiente" || t.estado === "Tarea");
  const tareasEntregadas = tareas.filter((t) => t.estado === "Entregada" || t.estado === "Completada");

  const nombreCompleto = estudiante
    ? `${estudiante.nombres || ""} ${estudiante.apellidoPaterno || ""} ${estudiante.apellidoMaterno || ""}`.trim()
    : usuario.nombre || "Estudiante";

  return (
    <div className="dashboard-estudiante-layout">
      <SidebarEstudiante
        onNavigate={setVistaActiva}
        onLogout={cerrarSesion}
        vistaActiva={vistaActiva}
      />

      <main className="dashboard-estudiante-main">
        {errorBackend && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              textAlign: "left",
            }}
          >
            {errorBackend}
          </div>
        )}

        {cargando && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "#ecfdf5",
              color: "#166534",
              border: "1px solid #bbf7d0",
              textAlign: "left",
            }}
          >
            Cargando datos desde el backend...
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 1: RESUMEN                             */}
        {/* ============================================ */}
        {vistaActiva === "resumen" && (
          <>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px", textAlign: "left" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Resumen</span>
            </div>

            <section
              style={{
                background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)",
                borderRadius: "20px",
                padding: "35px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 25px rgba(17, 81, 51, 0.12)",
                marginBottom: "30px",
              }}
            >
              <div style={{ textAlign: "left", zIndex: 2 }}>
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    padding: "4px 12px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {cursosUnicos.length > 0
                    ? `${cursosUnicos.length} curso${cursosUnicos.length > 1 ? "s" : ""}`
                    : "Sin cursos"}
                </span>
                <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "12px 0 6px 0", fontFamily: "'Poppins', sans-serif" }}>
                  Bienvenido, {nombreCompleto}
                </h1>
                <p style={{ color: "#a3d9b1", fontSize: "15px", margin: 0 }}>
                  Código: {estudiante?.codigoEstudiante || "N/A"} &nbsp;|&nbsp; DNI: {estudiante?.dni || "N/A"}
                </p>
              </div>
              <div style={{ display: "flex", gap: "15px", zIndex: 2 }}>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    padding: "20px 28px",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <FaChartLine style={{ fontSize: "28px", marginBottom: "8px" }} />
                  <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Promedio
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: "800" }}>{promedioGeneral}</div>
                </div>
              </div>
            </section>

            <div className="dashboard-estudiante-stats">
              <div className="dashboard-estudiante-stat">
                <div className="dashboard-estudiante-stat-icon"><FaLayerGroup /></div>
                <div>
                  <span>Mis cursos</span>
                  <strong>{cursosUnicos.length}</strong>
                </div>
              </div>
              <div className="dashboard-estudiante-stat">
                <div className="dashboard-estudiante-stat-icon"><FaCheckCircle /></div>
                <div>
                  <span>Calificaciones</span>
                  <strong>{calificaciones.length}</strong>
                </div>
              </div>
              <div className="dashboard-estudiante-stat">
                <div className="dashboard-estudiante-stat-icon"><FaClock /></div>
                <div>
                  <span>Tareas pendientes</span>
                  <strong>{tareasPendientes.length}</strong>
                </div>
              </div>
              <div className="dashboard-estudiante-stat" style={{ background: "linear-gradient(135deg, #166534 0%, #115133 100%)", color: "#fff" }}>
                <div className="dashboard-estudiante-stat-icon" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  <FaFolder />
                </div>
                <div>
                  <span style={{ color: "#bbf7d0" }}>Materiales</span>
                  <strong>{materiales.length}</strong>
                </div>
              </div>
            </div>

            <div className="dashboard-estudiante-sections">
              <div className="dashboard-estudiante-card" style={{ "--accent": "#14532d" }}>
                <div className="dashboard-estudiante-card-header">
                  <div className="dashboard-estudiante-card-icon"><FaBook /></div>
                  <div>
                    <h2>Mis Cursos</h2>
                    <p>Cursos matriculados este ciclo</p>
                  </div>
                </div>
                <ul className="dashboard-estudiante-lista">
                  {cursosUnicos.length === 0 ? (
                    <li style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>No tienes cursos registrados</li>
                  ) : (
                    cursosUnicos.map((c, idx) => (
                      <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "600" }}>{c.nombre}</span>
                        <span className="dashboard-estudiante-badge dashboard-estudiante-badge-success">
                          {c.notas.length} nota{c.notas.length !== 1 ? "s" : ""}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="dashboard-estudiante-card" style={{ "--accent": "#D4AF37" }}>
                <div className="dashboard-estudiante-card-header">
                  <div className="dashboard-estudiante-card-icon"><FaClock /></div>
                  <div>
                    <h2>Tareas Pendientes</h2>
                    <p>Entregas próximas</p>
                  </div>
                </div>
                <ul className="dashboard-estudiante-lista">
                  {tareasPendientes.length === 0 ? (
                    <li style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>No hay tareas pendientes</li>
                  ) : (
                    tareasPendientes.slice(0, 5).map((t, idx) => (
                      <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontWeight: "600", display: "block" }}>{t.titulo}</span>
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {t.fechaEntrega ? `Entrega: ${formatearFecha(t.fechaEntrega)}` : ""}
                          </span>
                        </div>
                        <span className="dashboard-estudiante-badge dashboard-estudiante-badge-warning">
                          {t.puntajeMaximo} pts
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* VISTA 2: MIS CURSOS                          */}
        {/* ============================================ */}
        {vistaActiva === "cursos" && (
          <>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px", textAlign: "left" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Mis cursos</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Mis Cursos
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                Cursos en los que estás matriculado
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {cursosUnicos.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#94a3b8", padding: "40px", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  No tienes cursos registrados
                </div>
              ) : (
                cursosUnicos.map((curso, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setCursoSeleccionado(curso.nombre); setVistaActiva("calificaciones"); }}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      padding: "24px",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "rgba(17,81,51,0.08)", color: "#115133", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                        <FaBookOpen />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "16px", color: "#1e293b" }}>{curso.nombre}</h3>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{curso.notas.length} calificación{curso.notas.length !== 1 ? "es" : ""}</span>
                      </div>
                    </div>
                    {curso.notas.length > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "10px" }}>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>Promedio</span>
                        <strong style={{ fontSize: "18px", color: "#115133" }}>
                          {(curso.notas.reduce((s, n) => s + Number(n.nota), 0) / curso.notas.length).toFixed(1)}
                        </strong>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* VISTA 3: CALIFICACIONES                      */}
        {/* ============================================ */}
        {vistaActiva === "calificaciones" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Calificaciones</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                  Mis Calificaciones
                </h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                  Promedio general: <strong style={{ color: "#115133" }}>{promedioGeneral}</strong>
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <table className="dashboard-estudiante-table">
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Tarea / Evaluación</th>
                    <th style={{ textAlign: "center" }}>Nota</th>
                    <th style={{ textAlign: "center" }}>Puntaje Máx.</th>
                    <th>Observación</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {calificaciones.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>
                        No tienes calificaciones registradas
                      </td>
                    </tr>
                  ) : (
                    calificaciones.map((c, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: "600" }}>{c.nombreCurso || "-"}</td>
                        <td>{c.tituloTarea || "-"}</td>
                        <td style={{ textAlign: "center" }}>
                          <strong style={{ color: Number(c.nota) >= 11 ? "#166534" : "#991b1b", fontSize: "16px" }}>
                            {c.nota}
                          </strong>
                        </td>
                        <td style={{ textAlign: "center" }}>{c.puntajeMaximo || "-"}</td>
                        <td>{c.observacion || "-"}</td>
                        <td>{formatearFecha(c.fechaRegistro)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 4: TAREAS                              */}
        {/* ============================================ */}
        {vistaActiva === "tareas" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Tareas</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Mis Tareas
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                {tareasPendientes.length} pendiente{tareasPendientes.length !== 1 ? "s" : ""} &nbsp;|&nbsp; {tareasEntregadas.length} entregada{tareasEntregadas.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {tareas.length === 0 ? (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  No hay tareas asignadas
                </div>
              ) : (
                tareas.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: t.estado === "Entregada" || t.estado === "Completada" ? "#dcfce7" : "#fef9c3", color: t.estado === "Entregada" || t.estado === "Completada" ? "#166534" : "#854d0e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t.estado === "Entregada" || t.estado === "Completada" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                      </div>
                      <div>
                        <span style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "block" }}>{t.titulo}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {t.descripcion ? `${t.descripcion.substring(0, 60)}...` : ""}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "12px", color: "#94a3b8", display: "block" }}>Entrega</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>
                          {t.fechaEntrega ? formatearFecha(t.fechaEntrega) : "Sin fecha"}
                        </span>
                      </div>
                      <span className={`dashboard-estudiante-badge ${t.estado === "Entregada" || t.estado === "Completada" ? "dashboard-estudiante-badge-success" : "dashboard-estudiante-badge-warning"}`}>
                        {t.estado || "Pendiente"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 5: MATERIALES                          */}
        {/* ============================================ */}
        {vistaActiva === "materiales" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Materiales</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Mis Materiales
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                Recursos subidos por tus docentes
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {materiales.length === 0 ? (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  No hay materiales disponibles
                </div>
              ) : (
                materiales.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <FaFilePdf style={{ color: "#ef4444", fontSize: "24px" }} />
                      <div>
                        <span style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "block" }}>{m.titulo || m.nombre || "Sin título"}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {m.tipo || "Archivo"} {m.fechaPublicacion ? `• ${formatearFecha(m.fechaPublicacion)}` : ""}
                        </span>
                        {m.descripcion && (
                          <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginTop: "3px" }}>
                            {m.descripcion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 6: HORARIO                             */}
        {/* ============================================ */}
        {vistaActiva === "horario" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Horario</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Mi Horario
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                Horario semanal de clases
              </p>
            </div>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <table className="dashboard-estudiante-table">
                <thead>
                  <tr>
                    <th style={{ width: "120px" }}>Hora</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                  </tr>
                </thead>
                <tbody>
                  {horario.map((fila, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: "600", fontSize: "13px", color: "#115133" }}>{fila.hora}</td>
                      {[fila.lunes, fila.martes, fila.miercoles, fila.jueves, fila.viernes].map((dia, i) => (
                        <td key={i} style={{
                          textAlign: "center",
                          color: dia === "RECESO" ? "#94a3b8" : "#334155",
                          fontWeight: dia === "RECESO" ? "400" : "500",
                          fontStyle: dia === "RECESO" ? "italic" : "normal",
                          backgroundColor: dia === "RECESO" ? "#f8fafc" : "transparent",
                        }}>
                          {dia}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 7: COMUNICADOS                         */}
        {/* ============================================ */}
        {vistaActiva === "comunicados" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Comunicados</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Comunicados
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                Avisos y noticias del colegio
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {comunicados.map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "20px 24px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <FaBullhorn style={{ color: "#115133", fontSize: "18px" }} />
                      <h3 style={{ margin: 0, fontSize: "16px", color: "#1e293b" }}>{c.titulo}</h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className={`dashboard-estudiante-badge ${
                        c.prioridad === "Alta" ? "dashboard-estudiante-badge-danger" :
                        c.prioridad === "Media" ? "dashboard-estudiante-badge-warning" :
                        "dashboard-estudiante-badge-info"
                      }`}>
                        {c.prioridad}
                      </span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{c.fecha}</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* VISTA 8: MI PERFIL                           */}
        {/* ============================================ */}
        {vistaActiva === "perfil" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal estudiante &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>Mi perfil</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                Mi Perfil
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>
                Información personal del estudiante
              </p>
            </div>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "30px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", maxWidth: "700px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px", paddingBottom: "24px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                  <FaUserGraduate />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "22px", color: "#1e293b" }}>{nombreCompleto}</h2>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>Código: {estudiante?.codigoEstudiante || "N/A"}</span>
                  {usuario.correo && (
                    <span style={{ color: "#94a3b8", fontSize: "13px", display: "block" }}>{usuario.correo}</span>
                  )}
                </div>
              </div>

              {estudiante ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <PerfilCampo label="DNI" value={estudiante.dni} />
                  <PerfilCampo label="Edad" value={estudiante.edad ? `${estudiante.edad} años` : null} />
                  <PerfilCampo label="Fecha de Nacimiento" value={estudiante.fechaNacimiento ? formatearFecha(estudiante.fechaNacimiento) : null} />
                  <PerfilCampo label="Sexo" value={estudiante.sexo} />
                  <PerfilCampo label="Dirección" value={estudiante.direccion} full />
                  <PerfilCampo label="Distrito" value={estudiante.distrito} />
                  <PerfilCampo label="Provincia" value={estudiante.provincia} />
                  <PerfilCampo label="Departamento" value={estudiante.departamento} />
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                  <p style={{ margin: 0, fontSize: "14px" }}>No se encontró información del estudiante vinculada a esta cuenta.</p>
                  <p style={{ margin: "8px 0 0", fontSize: "13px" }}>Contacte al administrador para vincular su registro.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PerfilCampo({ label, value, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", color: "#334155", fontWeight: "500" }}>
        {value || "No disponible"}
      </div>
    </div>
  );
}

export default DashboardEstudiante;
