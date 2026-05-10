import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    // MENSAJE ERROR
    const [error, setError] = useState("");

    const iniciarSesion = async (e) => {

        e.preventDefault();

        // LIMPIAR ERROR
        setError("");

        try {

            const response = await login({
                correo,
                password
            });

            if (response.data.success) {

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(response.data.usuario)
                );

                navigate("/dashboard");

            } else {

                // MENSAJE ERROR
                setError("Correo o contraseña incorrectos");

                // LIMPIAR INPUTS
                setCorreo("");
                setPassword("");
            }

        } catch (error) {

            setError("Error del servidor");

            setCorreo("");
            setPassword("");
        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "#e9ecef",
                fontFamily: "Arial",
                overflow: "hidden"
            }}
        >

            <div
                className="shadow-lg"
                style={{
                    width: "1000px",
                    height: "600px",
                    borderRadius: "30px",
                    overflow: "hidden",
                    display: "flex",
                    background: "white"
                }}
            >

                {/* PANEL IZQUIERDO */}

                <div
                    style={{
                        width: "50%",
                        background:
                            "linear-gradient(135deg, #2196f3, #42a5f5)",
                        color: "white",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "40px"
                    }}
                >

                    {/* EFECTOS */}

                    <div
                        style={{
                            position: "absolute",
                            top: "-80px",
                            left: "-80px",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)"
                        }}
                    ></div>

                    <div
                        style={{
                            position: "absolute",
                            bottom: "-100px",
                            right: "-100px",
                            width: "350px",
                            height: "350px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.08)"
                        }}
                    ></div>

                    {/* LOGO */}

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                        alt="logo"
                        width="140"
                        style={{
                            marginBottom: "20px",
                            zIndex: 1
                        }}
                    />

                    <h1
                        style={{
                            fontSize: "60px",
                            fontWeight: "bold",
                            zIndex: 1
                        }}
                    >
                        LMS
                    </h1>

                    <h3
                        style={{
                            zIndex: 1
                        }}
                    >
                        Sistema Educativo
                    </h3>

                    <hr
                        style={{
                            width: "100px",
                            border: "2px solid white",
                            opacity: 1,
                            zIndex: 1
                        }}
                    />

                    <p
                        style={{
                            textAlign: "center",
                            maxWidth: "300px",
                            zIndex: 1,
                            fontSize: "17px"
                        }}
                    >
                        Plataforma moderna para la gestión académica y educativa
                    </p>

                </div>

                {/* PANEL DERECHO */}

                <div
                    style={{
                        width: "50%",
                        padding: "60px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >

                    <h1
                        style={{
                            fontWeight: "bold",
                            color: "#1565c0",
                            marginBottom: "10px",
                            textAlign: "center",
                            fontSize: "55px"
                        }}
                    >
                        Bienvenido
                    </h1>

                    <p
                        style={{
                            textAlign: "center",
                            color: "gray",
                            marginBottom: "40px",
                            fontSize: "17px"
                        }}
                    >
                        Inicia sesión para continuar
                    </p>

                    <form onSubmit={iniciarSesion}>

                        {/* CORREO */}

                        <div className="mb-4">

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={(e) =>
                                    setCorreo(e.target.value)
                                }
                                style={{
                                    height: "55px",
                                    borderRadius: "15px",
                                    border: "1px solid #dcdcdc",
                                    paddingLeft: "20px",
                                    fontSize: "16px"
                                }}
                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-2">

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                style={{
                                    height: "55px",
                                    borderRadius: "15px",
                                    border: "1px solid #dcdcdc",
                                    paddingLeft: "20px",
                                    fontSize: "16px"
                                }}
                                required
                            />

                        </div>

                        {/* MENSAJE ERROR */}

                        {
                            error && (
                                <div
                                    style={{
                                        color: "red",
                                        fontSize: "14px",
                                        marginBottom: "20px",
                                        marginLeft: "5px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {error}
                                </div>
                            )
                        }

                        {/* RECORDAR */}

                        <div
                            className="d-flex justify-content-between mb-4"
                        >

                            <div>

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                />

                                <label
                                    className="ms-2"
                                    style={{
                                        color: "gray"
                                    }}
                                >
                                    Recordarme
                                </label>

                            </div>

                            <a
                                href="#"
                                style={{
                                    textDecoration: "none"
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </a>

                        </div>

                        {/* BOTON */}

                        <button
                            type="submit"
                            className="btn w-100"
                            style={{
                                height: "55px",
                                borderRadius: "15px",
                                background:
                                    "linear-gradient(to right, #2196f3, #1565c0)",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "18px",
                                border: "none",
                                transition: "0.3s"
                            }}
                        >
                            Iniciar Sesión
                        </button>

                    </form>

                    {/* FOOTER */}

                    <div
                        style={{
                            marginTop: "40px",
                            textAlign: "center",
                            color: "gray"
                        }}
                    >
                        © 2026 Sistema Educativo LMS
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;