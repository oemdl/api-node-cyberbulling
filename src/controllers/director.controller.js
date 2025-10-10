import { services } from '../services/director.services.js'

const setSedeByTutorConvivencia = async (req, res) => {
    const rows = await services.setSedeByTutorConvivencia(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message = success ? "Tutor de Convivencia registrado" : "No se pudo registrar al Tutor de Convivencia"
    res.send( { success, data, message } )
}

const setSedeByPsicologo = async (req, res) => {
    const rows = await services.setSedeByPsicologo(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message = success ? "Psicologo registrado" : "No se pudo registrar al Psicologo"
    res.send( { success, data, message } )
}

const getGruposBySede = async (req, res) => {
    const rows = await services.getGruposBySede(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Grupos registrados" : "No hay grupos registrados"
    res.send( { success, data, message } )
}

const setGrupoBySede = async (req, res) => {
    const rows = await services.setGrupoBySede(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message = success ? "Grupo registrado" : "No se pudo registrar al grupo"
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

const setAlumno = async (req, res) => {
    const rows = await services.setAlumno(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message =  rows.id ? "Alumno registrado" : rows.update ? "Alumno actualizado" : rows.error ? rows.error : "No se pudo registrar al alumno"
    res.send( { success, data, message } )
}

const setAlumnos = async (req, res) => {
    const rows = await services.setAlumnos(req, res)
    const success = true // rows.length > 0
    const data = success ? rows : null
    const message = success ? "Alumnos registrados" : "No se pudo registrar a los alumnos"
    res.send( { success, data, message } )
}


export const controller = {
    setSedeByTutorConvivencia, setSedeByPsicologo,
    getGruposBySede, setGrupoBySede,
    getAlumno, getAlumnos, getAlumnoByDni, setAlumno, setAlumnos,
    
}