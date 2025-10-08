import { pool } from '../db/db.js'

const getColegios = async (req, res) => {
    const rows = await pool.query('call sp_getColegios()')
    return ( rows[0] )
}

const getColegio = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getColegio(?)', [id])
    return ( rows[0] )
}

const setColegio = async (req, res) => {
    const { id, razonSocial, imagen } = req.body
    await pool.query('call sp_setColegio(?,?,?)', [id, razonSocial, imagen])
    
    const [ rows ] = await pool.query('call sp_getColegioByRazonSocial(?)', [razonSocial])
    return ( rows[0] )
}

const getSedes = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getSedes(?)', [id])
    return ( rows[0] )
}

const getSede = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getSede(?)', [id])
    return ( rows[0] )
}

const setSede = async (req, res) => {
    const { id, idColegio, idDirector, idTutorConvivencia, idPsicologo, ugel, telefono, imagen, distrito, direccion, correo, web, mapa } = req.body
    await pool.query('call sp_setSede(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ id,idColegio,idDirector,idTutorConvivencia,idPsicologo,ugel,telefono,imagen,distrito,direccion,correo,web,mapa ])
    
    const [ rows ] = await pool.query('call sp_getSedeByDistrito(?)', [distrito])
    return ( rows[0] )
}

const getDocentes = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getDocentes(?)', [id])
    return ( rows[0] )
}

const getDocente = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getDocente(?)', [id])
    return ( rows[0] )
}

const setDocente = async (req, res) => {
    const { id, idSede, nombres,apellidoPaterno,apellidoMaterno,dni,passwordd,fechaNacimiento,correo,telefono,nivel,imagen } = req.body
    await pool.query('call sp_setDocente(?,?,?,?,?,?,?,?,?,?,?,?)', [ id,idSede,nombres,apellidoPaterno,apellidoMaterno,dni,passwordd,fechaNacimiento,correo,telefono,nivel,imagen ])    
    const [ rows ] = await pool.query('call sp_getDocenteByDni(?)', [dni])
    return ( rows[0] )
}

const setDocentes = async (req, res) => {
    const { idSede, docentes } = req.body
    docentes.map(async ( docente ) => {
        const { nombres,apellidoPaterno,apellidoMaterno,dni,passwordd,fechaNacimiento,correo,telefono,nivel,imagen } = docente
        await pool.query('call sp_setDocente(?,?,?,?,?,?,?,?,?,?,?,?)', [ 0,idSede,nombres,apellidoPaterno,apellidoMaterno,dni,passwordd,fechaNacimiento,correo,telefono,nivel,imagen ])
    });

    const rows = await pool.query('call sp_getDocentes(?)', [idSede])
    return ( rows[0] )
}

export const services = {
    getColegios, getColegio, setColegio,
    getSedes, getSede, setSede,
    getDocentes, getDocente, setDocente, setDocentes,
}
