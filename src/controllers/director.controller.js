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

const setSedeGrupo = async (req, res) => {
    const rows = await services.setSedeGrupo(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message = success ? "Grupo registrado" : "No se pudo registrar al grupo"
    res.send( { success, data, message } )
}

export const controller = {
    setSedeByTutorConvivencia, setSedeByPsicologo,
    setSedeGrupo,
    
}