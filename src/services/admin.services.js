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
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setColegio(?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
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
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setSede(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) { 
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
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
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setDocente(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const setDocentes = async (req, res) => {
    let registros = []
    const { idSede, docentes } = req.body
    for ( const docente of docentes ) {
        const [ rows ] = await pool.query('call sp_setDocente(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ 0, idSede, ...Object.values(docente) ])
        if ( rows[0][0].insertID ) registros.push( { "id" : rows[0][0].insertID, idSede, ...docente } )
        if ( rows[0][0].error )    registros.push( { "error" : rows[0][0].error } )
    };
    if ( registros.every(obj => obj.error) ) registros = [];
    return( registros )
}

const setDirector = async (req, res) => {
    const { idSede, idDocente } = req.body
    const [ rows ] = await pool.query('call sp_setSedeByDirector(?,?)', [ idSede, idDocente ])
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

export const services = {
    getColegios, getColegio, setColegio,
    getSedes, getSede, setSede,
    getDocentes, getDocente, setDocente, setDocentes,
    setDirector,

}
