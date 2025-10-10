import { pool } from '../db/db.js'

const getDocentes = async (req, res) => {
    const idSede = req.params.idSede
    const rows = await pool.query('call sp_getDocentes(?)', [idSede])
    return ( rows[0] )
}

const getDocente = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getDocente(?)', [id])
    return ( rows[0] )
}

const getGrupos = async (req, res) => {
    const idSede = req.params.idSede
    const rows = await pool.query('call sp_getGrupos(?)', [id])
    return ( rows[0] )
}

const getAlumnos = async (req, res) => {
    const idGrupo = req.params.idGrupo
    const rows = await pool.query('call sp_getAlumnos(?)', [idGrupo])
    return ( rows[0] )
}

const getAlumno = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getAlumno(?)', [id])
    return ( rows[0] )
}

const getAlumnoByDni = async (req, res) => {
    const dni = req.params.dni
    const rows = await pool.query('call sp_getAlumnoByDni(?)', [dni])
    return ( rows[0] )
}

export const services = {
    getDocente, getDocentes,
    getGrupos,
    getAlumnos, getAlumno, getAlumnoByDni,

}