# Facultad de Ingeniería de Sistemas
# Hackaton 2023-11-12
Material para la Hackaton 12-11-2023

## Problemática
La Facultad carece de un aplicación que automatice la gestión de los grupos o secciones que se aperturan en cada semestre académico. El trabajo lo realizan utilizando archivos en Excel de una manera rudimentaria. Esto genera una sobrecarga de trabajo en el personal que esta a cargo de dicha tarea ya que los controles los tiene que realizar de manera manual (Ejemplo: verificar que no existan cruces de horario, verificar que el aula asignada a una seccion o secciones tenga la capacidad suficiente).
## Objetivo
Implementar una aplicación para la gestión de los Grupos o Secciones que se crean en cada semestre.

## Requerimientos Principales
1. Una interfaz para realizar el CRUD de los semestres
2. Una opción que permita activar o establecer un semestre como el semestre en curso
3. Debe permitir la apertura de grupos de un curso (*secciones*) en el semestre en curso.
4. Debe permitir la definición de horarios para las secciones en los diferentes tipos de dictado considerando la cantidad de horas que se dictan por cada tipo. Los tipos de dictado básicos son TEORIA, PRACTICA y LABORATORIO.
5. Debe permitir la asignación de aulas a las secciones.

## Notas
1. Durante la asignación de las aulas se debe tener en cuenta que algunos grupos pueden juntarse en una misma aula, para eso utilice la tabla curso_equivalencia. Alli puede definir un curso como equivalente a otro y por lo tanto las secciones se pueden juntar en una misma aula.
2. Con respecto a los horarios de un grupo, se debe permitir distribuir las horas a través de los diferentes días de la semana. Por ejemplo si un grupo tiene 4 horas de teoria estas se pueden distribuir 2 horas un LUN y 2 horas un MIE. Se debe controlar entonces que no se exceda la cantidad de horas del tipo de dictado de un curso. (deseable)
3. En cuanto a los horarios de un grupo no se puede permitir que grupos que pertenecen a cursos del mismo ciclo tengan curces de horario (deseable)
4. En la tabla grupo, no se ha tomado en cuenta un campo gru_iCapacidad que debería agregarse para poder comparar con la capacidad del aula para asi saber que el aula puede ser asignada al grupo o grupos. (deseable)

