CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200),
    price DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE Escuela;
DROP TABLE Aula;
DROP TABLE PlanEstudios;
DROP TABLE CursoTipoDictado;
DROP TABLE Curso;
DROP TABLE Grupo;
DROP TABLE GrupoHorario;
DROP TABLE CursoHorasDictado;

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
    horas_teoria INT NOT NULL,
    horas_practica INT NOT NULL,
    horas_laboratorio INT NOT NULL,
    FOREIGN KEY (id_plan_estudios) REFERENCES PlanEstudios(id_plan_estudios)
);

CREATE TABLE Grupo (
    id_grupo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_curso INT UNSIGNED NOT NULL,
    id_aula INT UNSIGNED,  -- Asegúrate de que coincida con la definición en la tabla Aula
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

-- Insertar 8 cursos en la malla curricular con id_plan_estudios igual a 1
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (1, 'Calculo I', 2, 4, 0),
    (1, 'Álgebra Lineal', 3, 2, 1),
    (1, 'Introducción a la Programación', 4, 2, 2),
    (1, 'Estructuras de Datos', 3, 3, 1),
    (1, 'Base de Datos', 2, 2, 4),
    (1, 'Redes de Computadoras', 3, 2, 2),
    (1, 'Inglés Técnico', 2, 2, 0),
    (1, 'Proyecto Integrador I', 1, 2, 3);


-- Insertar 8 cursos en la malla curricular con id_plan_estudios igual a 2
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (2, 'Programación Avanzada', 3, 3, 1),
    (2, 'Matemáticas Discretas', 2, 2, 2),
    (2, 'Sistemas Operativos', 3, 2, 2),
    (2, 'Diseño de Algoritmos', 2, 4, 0),
    (2, 'Inteligencia Artificial', 3, 2, 2),
    (2, 'Desarrollo Web', 2, 3, 1),
    (2, 'Seguridad Informática', 3, 1, 2),
    (2, 'Ética y Responsabilidad Profesional', 2, 1, 0);

-- Malla curricular con id_plan_estudios igual a 3
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (3, 'Programación y Computacion', 3, 2, 1),
    (3, 'Química', 2, 3, 1),
    (3, 'Cálculo II', 3, 3, 0),
    (3, 'Física Electrónica', 2, 2, 0),
    (3, 'Sistemas Operativos', 2, 4, 1),
    (3, 'Algebra y Geometría Analítica', 3, 2, 2),
    (3, 'Emprendimiento', 2, 3, 1),
    (3, 'Biología', 2, 1, 0);


-- Malla curricular con id_plan_estudios igual a 4
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (4, 'Física I', 3, 2, 1),
    (4, 'Química General', 2, 3, 1),
    (4, 'Cálculo II', 3, 3, 0),
    (4, 'Inglés Avanzado', 2, 2, 0),
    (4, 'Desarrollo de Software', 2, 4, 1),
    (4, 'Sistemas Distribuidos', 3, 2, 2),
    (4, 'Diseño de Bases de Datos', 2, 3, 1),
    (4, 'Ética en la Tecnología', 2, 1, 0);


-- Malla curricular con id_plan_estudios igual a 4
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (4, 'Física I', 3, 2, 1),
    (4, 'Química General', 2, 3, 1),
    (4, 'Cálculo II', 3, 3, 0),
    (4, 'Inglés Avanzado', 2, 2, 0),
    (4, 'Desarrollo de Software', 2, 4, 1),
    (4, 'Sistemas Distribuidos', 3, 2, 2),
    (4, 'Diseño de Bases de Datos', 2, 3, 1),
    (4, 'Ética en la Tecnología', 2, 1, 0);

-- Malla curricular con id_plan_estudios igual a 5
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (5, 'Álgebra Abstracta', 3, 2, 0),
    (5, 'Lenguajes de Programación', 2, 3, 1),
    (5, 'Circuitos Eléctricos', 3, 2, 2),
    (5, 'Programación Orientada a Objetos', 3, 3, 1),
    (5, 'Gestión de Proyectos', 2, 2, 0),
    (5, 'Introducción a la Robótica', 2, 4, 0),
    (5, 'Sistemas de Información', 3, 1, 2),
    (5, 'Ética y Sostenibilidad', 2, 1, 0);

-- Malla curricular con id_plan_estudios igual a 6
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (6, 'Cálculo III', 3, 3, 0),
    (6, 'Redes Neuronales', 3, 2, 2),
    (6, 'Sistemas Embebidos', 2, 3, 1),
    (6, 'Diseño de Interfaz de Usuario', 2, 4, 0),
    (6, 'Economía y Negocios', 2, 2, 0),
    (6, 'Sistemas de Información Geográfica', 3, 1, 2),
    (6, 'Programación Funcional', 2, 2, 1),
    (6, 'Desarrollo Ágil de Software', 3, 2, 2);

-- Malla curricular con id_plan_estudios igual a 7
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (7, 'Estadística Aplicada', 2, 3, 1),
    (7, 'Criptografía', 3, 2, 2),
    (7, 'Arquitectura de Computadoras', 3, 3, 1),
    (7, 'Desarrollo de Aplicaciones Móviles', 2, 2, 1),
    (7, 'Gestión de la Innovación', 2, 1, 0),
    (7, 'Introducción a la Bioinformática', 3, 2, 0),
    (7, 'Computación Cuántica', 2, 4, 1),
    (7, 'Ética en la Tecnología de la Información', 2, 1, 0);

-- Malla curricular con id_plan_estudios igual a 8
INSERT INTO Curso (id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio)
VALUES
    (8, 'Introducción a la Inteligencia Artificial', 2, 3, 1),
    (8, 'Seguridad en Redes', 3, 2, 2),
    (8, 'Desarrollo de Aplicaciones Web Avanzado', 3, 3, 1),
    (8, 'Ética y Derechos Digitales', 2, 2, 0),
    (8, 'Machine Learning', 2, 4, 0),
    (8, 'Sistemas de Recomendación', 3, 2, 2),
    (8, 'Big Data Analytics', 2, 3, 1),
    (8, 'Proyecto de Investigación en Tecnologías Emergentes', 2, 1, 0);
