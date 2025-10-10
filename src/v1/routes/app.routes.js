import { Router } from "express"
import { controller } from "../../controllers/app.controller.js"

const router = Router()

router
    .get("/docentes/:id", controller.getDocentes )
    .get("/docente/:id", controller.getDocente )

    .get("/sede/grupos/:id", controller.getGruposBySede )

    .get("/alumnos/:id", controller.getAlumnos )
    .get("/alumno/:id", controller.getAlumno )
    .get("/alumno/dni/:dni", controller.getAlumnoByDni )

export default router