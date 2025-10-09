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


export const services = { 
    setSedeByTutorConvivencia, setSedeByPsicologo,
    setSedeGrupo,
}