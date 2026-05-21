import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Estudiantes from "../pages/Estudiantes";
import Cursos from "../pages/Cursos";
import Docentes from "../pages/Docentes";
import Matriculas from "../pages/Matriculas";
import Padres from "../pages/Padres";
import GenerarMatricula from "../pages/GenerarMatricula";
function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route 
                    path="/dashboard" 
                    element={<Dashboard />} 
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route 
                    path="/estudiantes" 
                    element={<Estudiantes />} 
                />

                <Route 
                path="/cursos" 
                    element={<Cursos />} 
                />
                
                <Route 
                    path="/docentes" 
                    element={<Docentes />} 
                />

                <Route 
                    path="/matriculas" 
                    element={<Matriculas />} 
                />

                <Route 
                    path="/padres" 
                    element={<Padres />} 
                />

                <Route 
                    path="/generar-matricula" 
                    element={<GenerarMatricula />} 
                />

            </Routes>

        </BrowserRouter>

    );
}

export default AppRouter;