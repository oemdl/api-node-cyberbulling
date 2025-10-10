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

const setGrupo = async (req, res) => {
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setGrupo(?,?,?,?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }
    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
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
    const { idGrupo, alumnos } = req.body
    
    let registros = []
    for ( let alumno of alumnos ) {
        let { apoderado, ...alumno_data  } = alumno

        const [ rows_apoderado ] = await pool.query('call sp_setApoderado(?,?,?,?,?,?,?)', [ 0, ...Object.values( apoderado ) ])
        
        alumno_data.idGrupo = idGrupo
        alumno_data.idApoderado = rows_apoderado[0][0].insertID

        const [ rows_alumno ] = await pool.query('call sp_setAlumno(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [ ...Object.values( alumno_data ) ])
        if ( rows_alumno[0][0].insertID )  {
            alumno_data.id = rows_alumno[0][0].insertID
            registros.push( { alumno_data } )
        }
        if ( rows_alumno[0][0].error )  registros.push( { "error" : rows_alumno[0][0].error } )
    }

    if ( registros.every(obj => obj.error) ) registros = [];
    return( registros )
}


export const services = { 
    setSedeByTutorConvivencia, setSedeByPsicologo,
    setGrupo,
    setAlumno, setAlumnos,

}