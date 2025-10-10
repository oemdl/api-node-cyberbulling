import { services } from '../services/admin.services.js'

const getColegios = async (req, res) => {
    const rows = await services.getColegios(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Colegio registrados" : "No hay colegios registrados"
    res.send( { success, data, message } )
}

const getColegio = async (req, res) => {
    const rows = await services.getColegio(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Colegio registrado" : "Colegio no registrado"
    res.send( { success, data, message } )
}

const setColegio = async (req, res) => {
    const rows = await services.setColegio(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message =  rows.id ? "Colegio registrado" : rows.update ? "Colegio actualizado" : rows.error ? rows.error : "No se pudo registrar el colegio"
    res.send( { success, data, message } )
}

const getSedes = async (req, res) => {
    const rows = await services.getSedes(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0] : null
    const message = success ? "Sedes registradas" : "No hay sedes registradas"
    res.send( { success, data, message } )
}

const getSede = async (req, res) => {
    const rows = await services.getSede(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Sede registrada" : "Sede no registrada"
    res.send( { success, data, message } )
}

const setSede = async (req, res) => {
    const rows = await services.setSede(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message =  rows.id ? "Sede registrada" : rows.update ? "Sede actualizada" : rows.error ? rows.error : "No se pudo registrar la sede"
    res.send( { success, data, message } )
}

const setDocente = async (req, res) => {
    const rows = await services.setDocente(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message =  rows.id ? "Docente registrado" : rows.update ? "Docente actualizado" : rows.error ? rows.error : "No se pudo registrar al docente"
    res.send( { success, data, message } )
}

const setDocentes = async (req, res) => {
    const rows = await services.setDocentes(req, res)
    const success = rows.length > 0
    const data = success ? rows : null
    const message = success ? "Docentes registrados" : "No se pudo registrar a los docentes"
    res.send( { success, data, message } )
}

const setDirector = async (req, res) => {
    const rows = await services.setDirector(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message = success ? "Director registrado" : "No se pudo registrar al Director"
    res.send( { success, data, message } )
}

export const controller = {
    getColegios, getColegio, setColegio,
    getSedes, getSede, setSede,
    setDocente, setDocentes,
    setDirector,
}
