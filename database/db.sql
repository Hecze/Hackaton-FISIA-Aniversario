CREATE DATABASE IF NOT EXISTS nextmysqlcrud;
USE nextmysqlcrud;

/* para subir a railway usar: "USE railway*/


DROP TABLE IF EXISTS escuela;
DROP TABLE IF EXISTS Escuela;
DROP TABLE IF EXISTS Aula;
DROP TABLE IF EXISTS PlanEstudios;
DROP TABLE IF EXISTS CursoTipoDictado;
DROP TABLE IF EXISTS Curso;
DROP TABLE IF EXISTS Grupo;
DROP TABLE IF EXISTS GrupoHorario;
DROP TABLE IF EXISTS CursoHorasDictado;

CREATE TABLE Escuela (
    id_escuela INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_escuela VARCHAR(255) NOT NULL
);

CREATE TABLE Aula (
    id_aula INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_aula VARCHAR(255) NOT NULL,
    capacidad INT NOT NULL
);

CREATE TABLE PlanEstudios (
    id_plan_estudios INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_escuela INT UNSIGNED NOT NULL,
    plaest_año INT NOT NULL,
    plaest_dVigencia DATE,
    FOREIGN KEY (id_escuela) REFERENCES Escuela(id_escuela)
);

CREATE TABLE CursoTipoDictado (
    id_tipo_dictado INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_dictado VARCHAR(255) NOT NULL,
    horas_semana INT 
);

CREATE TABLE Curso (
    id_curso INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_plan_estudios INT UNSIGNED,
    nombre_curso VARCHAR(255) NOT NULL,
    ciclo INT UNSIGNED DEFAULT 0,
    horas_teoria INT NOT NULL,
    horas_practica INT NOT NULL,
    horas_laboratorio INT NOT NULL,
    FOREIGN KEY (id_plan_estudios) REFERENCES PlanEstudios(id_plan_estudios)
);


CREATE TABLE Grupo (
    id_grupo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_curso INT UNSIGNED NOT NULL,
    gru_iNumero INT UNSIGNED,
    id_aula INT UNSIGNED,  
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso),
    FOREIGN KEY (id_aula) REFERENCES Aula(id_aula) 
);

CREATE TABLE GrupoHorario (
    id_grupo_horario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_grupo INT UNSIGNED NOT NULL,
    id_dia_semana INT,
    hora_inicio TIME,
    hora_fin TIME,
    FOREIGN KEY (id_grupo) REFERENCES Grupo(id_grupo)
);

CREATE TABLE CursoHorasDictado (
    id_curso_horas_dictado INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_curso INT UNSIGNED NOT NULL,
    id_tipo_dictado INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso),
    FOREIGN KEY (id_tipo_dictado) REFERENCES CursoTipoDictado(id_tipo_dictado),
    horas_dictado INT
);


INSERT INTO Escuela (nombre_escuela) VALUES ('Ingeniería de Software');
INSERT INTO Escuela (nombre_escuela) VALUES ('Ingeniería de Sistemas');
INSERT INTO Escuela (nombre_escuela) VALUES ('Ciencias de la Computación');


INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (1, 2011);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (1, 2015);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (1, 2018);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (1, 2023);

INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (2, 2011);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (2, 2015);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (2, 2018);
INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (2, 2023);

INSERT INTO PlanEstudios (id_escuela, plaest_año) VALUES (3, 2023);


-- Plan de estudios 1
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES

(1, 'CALCULO I', 1, 4, 2, 0),
(1, "REDACCIÓN Y TÉCNICASDE COMUNICACIÓN", 1, 2,2,0),
(1, "MÉTODOS DE ESTUDIOS UNIVERSITARIOS", 1, 2, 2, 0),
(1, "DESARROLLO PERSONAL Y LIDERAZGO", 1, 2, 2, 0),
(1, "BIOLOGÍA PARA CIENCIAS E INGENIERÍA", 1, 2, 2, 2),
(1, "ALGEBRA Y GEOMETRÍA ANALÍTICA", 1, 4,2,0),
(1, "MEDIO AMBIENTE Y DESARROLLO SOSTENIBLE", 1, 3,1, 0),

(1, "REDACCIÓN Y TÉCNICASDE COMUNICACIÓN EFECTIVA II", 2, 2,2,0),
(1, "NVESTIGACIÓN FORMATIVA", 2, 2,2,0),
(1, "REALIDAD NACIONAL Y MUNDIAL", 2, 1, 2, 0),
(1, "CÁLCULO II ", 2,4,2,0),
(1, "FÍSICA I", 2, 2,2,2),
(1, "QUÍMICA GENERAL", 2, 4,2,0),
(1, "INTRODUCCIÓN A LAS CIENCIAS E INGENIERÍA", 2,2,1,0),

(1, "Estructuras de Datos", 3, 4, 2, 2),
(1, "Programación Orientada a Objetos", 3, 4, 2, 2),
(1, "Bases de Datos I", 3, 3, 1, 2),
(1, "Análisis y Diseño de Sistemas", 3, 3, 2, 0),
(1, "Matemáticas Discretas", 3, 4, 2, 0),
(1, "Ética en Ingeniería de Software", 3, 2, 2, 0),
(1, "Desarrollo de Aplicaciones Web I", 3, 3, 2, 2),
(1, "Inglés Técnico I", 3, 2, 2, 0),
(1, "Metodologías Ágiles de Desarrollo", 3, 3, 1, 0),

(1, "Estructuras de Datos Avanzadas", 4, 4, 2, 2),
(1, "Bases de Datos II", 4, 3, 1, 2),
(1, "Desarrollo de Aplicaciones Web II", 4, 3, 2, 2),
(1, "Sistemas Operativos", 4, 3, 1, 2),
(1, "Análisis y Diseño de Algoritmos", 4, 4, 2, 0),
(1, "Ingeniería de Requisitos", 4, 3, 2, 0),
(1, "Inglés Técnico II", 4, 2, 2, 0),
(1, "Pruebas de Software", 4, 3, 1, 0),
(1, "Desarrollo Ágil con SCRUM", 4, 3, 1, 0),

(1, "Inteligencia Artificial", 5, 4, 2, 2),
(1, "Desarrollo de Aplicaciones Móviles", 5, 3, 2, 2),
(1, "Arquitectura de Software", 5, 3, 2, 2),
(1, "Redes de Computadoras", 5, 3, 1, 2),
(1, "Seguridad Informática", 5, 3, 1, 2),
(1, "Desarrollo de Sistemas Empresariales", 5, 3, 2, 0),
(1, "Gestión de Proyectos de Software", 5, 2, 2, 0),
(1, "Inglés Técnico III", 5, 2, 2, 0),
(1, "Taller de Investigación I", 5, 2, 2, 0),

(1, "Desarrollo de Aplicaciones Distribuidas", 6, 3, 2, 2),
(1, "Ingeniería de Software para Sistemas Embebidos", 6, 4, 1, 2),
(1, "Diseño de Interfaces de Usuario", 6, 3, 2, 2),
(1, "Desarrollo de Juegos", 6, 4, 2, 2),
(1, "Emprendimiento en Tecnologías de la Información", 6, 2, 2, 0),
(1, "Inglés Técnico IV", 6, 2, 2, 0),
(1, "Taller de Investigación II", 6, 2, 2, 0),

(1, "Desarrollo de Sistemas Inteligentes", 7, 4, 2, 2),
(1, "Gestión de Configuración y Versionado", 7, 3, 1, 2),
(1, "Desarrollo Ágil con DevOps", 7, 3, 2, 2),
(1, "Ética en la Ingeniería de Software Avanzada", 7, 2, 2, 0),
(1, "Procesamiento de Lenguaje Natural", 7, 3, 2, 2),
(1, "Inglés Técnico V", 7, 2, 2, 0),
(1, "Taller de Investigación III", 7, 2, 2, 0),

(1, "Proyecto de Ingeniería de Software III", 8, 0, 0, 0),
(1, "Seminario de Investigación III", 8, 0, 0, 0),
(1, "Práctica Pre-Profesional", 9, 0, 0, 0);


-- Plan de estudios 2
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (2, 'Cálculo I', 1, 4, 2, 0),
    (2, 'Cálculo II', 2, 4, 2, 0),
    (2, 'Programación Avanzada', 3, 2, 1, 0),
    (2, 'Programación Orientada a Objetos', 2, 3, 2, 0),
    (2, 'Programación Web', 2, 2, 2, 2),
    (2, 'Dispositivos Móviles', 2, 2, 2, 1),
    (2, 'Programación de Videojuegos', 2, 2, 2, 2),
    (2, 'Robotica I', 2, 2, 2, 0),
    (2, 'Desarrollo De Software', 2, 2, 2, 0),
    (2, 'Sistemas Operativos', 2, 2, 2, 2);

-- Plan de estudios 3
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (3, 'Cálculo I', 1, 4, 2, 0),
    (3, 'Cálculo II', 2, 4, 2, 0),
    (3, 'Fisica Electrica', 4, 2, 4, 0),
    (3, 'Introducción a la Programación', 1, 3, 2, 0),
    (3, 'Estructuras de Datos', 3, 4, 3, 1),
    (3, 'Algoritmos Avanzados', 5, 5, 3, 1),
    (3, 'Bases de Datos', 7, 4, 3, 2),
    (3, 'Redes de Computadoras', 8, 3, 3, 2),
    (3, 'Sistemas Operativos', 9, 4, 2, 2),
    (3, 'Ingeniería de Software', 6, 3, 4, 1),
    (3, 'Proyecto de Desarrollo de Software', 8, 2, 2, 3);

INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(4, 'Cálculo I', 1, 4, 2, 0),
(4, 'Cálculo II', 2, 4, 2, 0),
    (4, 'Inteligencia Artificial', 9, 4, 3, 2),
    (4, 'Bases de Datos Avanzadas', 7, 3, 2, 1),
    (4, 'Seguridad Informática', 5, 2, 3, 1),
    (4, 'Desarrollo de Aplicaciones Móviles', 6, 2, 4, 1),
    (4, 'Gestión de Proyectos de Software', 8, 2, 3, 0),
    (4, 'Redes de Computadoras', 8, 3, 2, 2),
    (4, 'Análisis de Algoritmos', 5, 3, 3, 0),
    (4, 'Diseño de Sistemas', 6, 4, 2, 1);

INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(5, 'Cálculo I', 1, 4, 2, 0),
(5, 'Cálculo II', 2, 4, 2, 0),
    (5, 'Ingeniería de Software', 2, 4, 3, 1),
    (5, 'Machine Learning', 3, 5, 3, 2),
    (5, 'Desarrollo Ágil de Proyectos', 2, 3, 4, 0),
    (5, 'Computación en la Nube', 3, 3, 3, 2),
    (5, 'Innovación Tecnológica', 2, 2, 2, 1),
    (5, 'Proyecto de Tesis', 3, 1, 0, 4),
    (5, 'Ética en la Tecnología', 2, 2, 2, 0),
    (5, 'Comunicación Técnica', 2, 1, 3, 0);

-- Plan de estudios 6
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(6, 'Cálculo I', 1, 4, 2, 0),
(6, 'Cálculo II', 2, 4, 2, 0),
    (6, 'Ciberseguridad', 3, 3, 3, 1),
    (6, 'Desarrollo de Aplicaciones Web Avanzadas', 3, 3, 3, 2),
    (6, 'Sistemas Distribuidos', 3, 4, 2, 1),
    (6, 'Realidad Virtual y Aumentada', 3, 3, 3, 1),
    (6, 'Procesamiento de Lenguaje Natural', 3, 4, 2, 2),
    (6, 'Gestión de Datos', 3, 2, 4, 0),
    (6, 'Desarrollo de Aplicaciones Empresariales', 3, 3, 3, 1),
    (6, 'Proyecto Integrador', 3, 1, 2, 3);

-- Plan de estudios 7
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(7, 'Cálculo I', 1, 4, 2, 0),
(7, 'Cálculo II', 2, 4, 2, 0),
    (7, 'Computación Cuántica', 9, 5, 2, 2),
    (7, 'Big Data Analytics', 8, 4, 3, 1),
    (7, 'Desarrollo de Juegos en 3D', 7, 3, 3, 2),
    (7, 'Blockchain y Criptomonedas', 7, 3, 3, 1),
    (7, 'Integración de Sistemas', 4, 4, 2, 1),
    (7, 'Diseño Centrado en el Usuario', 3, 2, 3, 1),
    (7, 'Proyecto de Investigación', 9, 1, 2, 3),
    (7, 'Emprendimiento Tecnológico', 3, 2, 2, 1);

-- Plan de estudios 8
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(8, 'Cálculo I', 1, 4, 2, 0),
(8, 'Cálculo II', 2, 4, 2, 0),
    (8, 'Inteligencia Artificial Avanzada', 3, 4, 3, 2),
    (8, 'Desarrollo de Aplicaciones Móviles', 5, 3, 4, 1),
    (8, 'Gestión de Proyectos de Tecnología', 3, 3, 3, 1),
    (8, 'Análisis de Datos', 6, 4, 3, 0),
    (8, 'Tecnologías Emergentes', 4, 3, 3, 1),
    (8, 'Seguridad en Redes', 3, 3, 2, 2),
    (8, 'Desarrollo de Negocios Tecnológicos', 4, 2, 3, 0),
    (8, 'Proyecto Final', 10, 1, 2, 3);

-- Plan de estudios 9
INSERT INTO Curso (id_plan_estudios, nombre_curso, ciclo, horas_teoria, horas_practica, horas_laboratorio)
VALUES
(2, 'Cálculo I', 1, 4, 2, 0),
(2, 'Cálculo II', 2, 4, 2, 0),
    (9, 'Internet de las Cosas', 1, 3, 3, 1),
    (9, 'Desarrollo de Aplicaciones para Dispositivos Móviles', 3, 3, 4, 1),
    (9, 'Inteligencia de Negocios', 1, 4, 3, 1),
    (9, 'Diseño de Experiencia de Usuario', 2, 3, 3, 2),
    (9, 'Sistemas de Información Empresarial', 0, 2, 4, 0),
    (9, 'Desarrollo Ágil con Scrum', 1, 3, 3, 1),
    (9, 'Ética en la Tecnología de la Información', 3, 2, 2, 0),
    (9, 'Proyecto de Innovación Tecnológica', 3, 1, 2, 3);




-- Crear una secuencia de números del 1 al 55
INSERT INTO Grupo (id_curso)
SELECT n
FROM (
    SELECT (t0.n + t1.n * 10 + t2.n * 100) + 1 AS n
    FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS t0
    CROSS JOIN (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS t1
    CROSS JOIN (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS t2
    WHERE (t0.n + t1.n * 10 + t2.n * 100) + 1 <= 55
) AS numbers;
