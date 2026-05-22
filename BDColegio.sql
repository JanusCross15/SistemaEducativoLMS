CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    rol VARCHAR(20),
);

CREATE TABLE matriculas (
    id_matricula SERIAL PRIMARY KEY,
    nivel VARCHAR(50),
    grado VARCHAR(20),
    seccion VARCHAR(10),
    dni VARCHAR(20),
    celular VARCHAR(20),
    fecha_matricula DATE DEFAULT CURRENT_DATE
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    codigo_estudiante VARCHAR(20) UNIQUE,

    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    nombres VARCHAR(100),

    fecha_nacimiento DATE,
    provincia VARCHAR(100),
    departamento VARCHAR(100),
    distrito VARCHAR(100),

    sexo VARCHAR(20),
    edad INT,
    direccion VARCHAR(200),

    id_matricula INT,

    CONSTRAINT fk_matricula
    FOREIGN KEY (id_matricula)
    REFERENCES matriculas(id_matricula)
);

CREATE TABLE padres (

    id_padre SERIAL PRIMARY KEY,

    nombres VARCHAR(100),
    apellidos VARCHAR(100),

    dni VARCHAR(20),
    telefono VARCHAR(20),

    direccion VARCHAR(200),

    tipo VARCHAR(20),

    id_estudiante INT,

    CONSTRAINT fk_estudiante_padre
    FOREIGN KEY (id_estudiante)
    REFERENCES estudiantes(id_estudiante)

);

CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    especialidad VARCHAR(100),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    dni VARCHAR(20)
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,

    nombre VARCHAR(100),
    descripcion VARCHAR(200),

    id_docente INT,

    CONSTRAINT fk_docente
    FOREIGN KEY (id_docente)
    REFERENCES docentes(id_docente)
);

CREATE TABLE usuarios_padre (

    id_usuario SERIAL PRIMARY KEY,

    nombres VARCHAR(100),

    apellidos VARCHAR(100),

    dni VARCHAR(20),

    correo VARCHAR(100) UNIQUE,

    password VARCHAR(255),

	telefono VARCHAR(20),
	
	estado VARCHAR(20)
);



