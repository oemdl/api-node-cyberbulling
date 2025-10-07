import { pool } from '../db/db.js'

const getColegios = async (req, res) => {
    const rows = await pool.query('call sp_getColegios()')
    return ( rows[0] )
}

const getColegio = async (req, res) => {
    const { id } = req.params
    const rows = await pool.query('call sp_getColegio(?)', [id])
    return ( rows[0] )
}

const setColegio = async (req, res) => {
    const { id, razonSocial, filename } = req.body
    await pool.query('call sp_setColegio(?,?,?)', [id, razonSocial, filename])
    
    const [ rows ] = await pool.query('call sp_getColegioByRazonSocial(?)', [razonSocial])
    return ( rows[0] )
}

const getSedes = async (req, res) => {
    const { id } = req.params
    const rows = await pool.query('call sp_getSedes(?)', [id])
    return ( rows[0] )
}

const getSede = async (req, res) => {
    const { id } = req.params
    const rows = await pool.query('call sp_getSede(?)', [id])
    return ( rows[0] )
}

const setSede = async (req, res) => {
    const { id, idColegio, idDirector, idTutorConvivencia, idPsicologo, ugel, telefono, filename, distrito, direccion, correo, web, mapa } = req.body
    await pool.query('call sp_setSede(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ id,idColegio,idDirector,idTutorConvivencia,idPsicologo,ugel,telefono,filename,distrito,direccion,correo,web,mapa ])
    
    const [ rows ] = await pool.query('call sp_getSedeByDistrito(?)', [distrito])
    return ( rows[0] )
}


export const services = {
    getColegios, getColegio, setColegio,
    getSedes, getSede, setSede,
}
