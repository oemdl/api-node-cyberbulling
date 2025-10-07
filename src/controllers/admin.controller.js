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
    const success = rows.length > 0
    const data = success ? rows[0] : null
    const message = success ? "Colegio registrado" : "No se pudo registrar el colegio"
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
    const success = rows.length > 0
    const data = success ? rows[0] : null
    const message = success ? "Sede registrado" : "No se pudo registrar la sede"
    res.send( { success, data, message } )
}

export const controller = {
    getColegios, getColegio, setColegio,
    getSedes, getSede, setSede,   
}
