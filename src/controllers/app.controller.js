import { services } from '../services/app.services.js'

const getDocentes = async (req, res) => {
    const rows = await services.getDocentes(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Docentes registrados" : "No hay docentes registrados"
    res.send( { success, data, message } )
}

const getDocente = async (req, res) => {
    const rows = await services.getDocente(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Docente registrado" : "Docente no registrado"
    res.send( { success, data, message } )
}

const getGruposBySede = async (req, res) => {
    const rows = await services.getGruposBySede(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Grupos registrados" : "No hay grupos registrados"
    res.send( { success, data, message } )
}

const getAlumnos = async (req, res) => {
    const rows = await services.getAlumnos(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Alumnos registrados" : "No hay alumnos registrados"
    res.send( { success, data, message } )
}

const getAlumno = async (req, res) => {
    const rows = await services.getAlumno(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Alumno registrado" : "Alumno no registrado"
    res.send( { success, data, message } )
}

const getAlumnoByDni = async (req, res) => {
    const rows = await services.getAlumnoByDni(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Alumno registrado" : "Alumno no registrado"
    res.send( { success, data, message } )
}

export const controller = {
    getDocente, getDocentes,
    getGruposBySede,
    getAlumno, getAlumnos, getAlumnoByDni,
    
}