import { pool } from '../db/db.js'

const setSedeByTutorConvivencia = async (req, res) => {
    const { idSede, idDocente } = req.body
    const [ rows ] = await pool.query('call sp_setSedeByTutorConvivencia(?,?)', [ idSede, idDocente ])
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const setSedeByPsicologo = async (req, res) => {
    const { idSede, idDocente } = req.body
    const [ rows ] = await pool.query('call sp_setSedeByPsicologo(?,?)', [ idSede, idDocente ])
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const setSedeGrupo = async (req, res) => {
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setSedeGrupo(?,?,?,?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const getAlumnos = async (req, res) => {
    const id = req.params.id
    const rows = await pool.query('call sp_getAlumnos(?)', [id])
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

const setAlumno = async (req, res) => {
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setAlumno(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const setAlumnos = async (req, res) => {


    let registros = []
    const { idSede, docentes } = req.body
    for ( const docente of docentes ) {
        const [ rows ] = await pool.query('call sp_setAlumno(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ 0, idSede, ...Object.values(docente) ])
        if ( rows[0][0].insertID ) registros.push( { "id" : rows[0][0].insertID, idSede, ...docente } )
        if ( rows[0][0].error )    registros.push( { "error" : rows[0][0].error } )
    };

    if ( registros.every(obj => obj.error) ) registros = [];
    return( registros )
}


export const services = { 
    setSedeByTutorConvivencia, setSedeByPsicologo, setSedeGrupo, 
    getAlumnos, getAlumno, getAlumnoByDni, setAlumno, setAlumnos,

}