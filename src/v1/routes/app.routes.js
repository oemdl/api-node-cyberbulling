import { Router } from "express"
import { controller } from "../../controllers/app.controller.js"

const router = Router()

router
    .get("/docentes/:idSede", controller.getDocentes )
    .get("/docente/:id", controller.getDocente )

    .get("/grupos/:idSede", controller.getGrupos )

    .get("/alumnos/:idGrupo", controller.getAlumnos )
    .get("/alumno/:id", controller.getAlumno )
    .get("/alumno/dni/:dni", controller.getAlumnoByDni )

    .get("/incidencias/:id", controller.getIncidencias )
    .post("/incidencia", controller.setIncidencia )


export default router