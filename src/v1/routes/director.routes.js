import { Router } from "express"
import { controller } from "../../controllers/director.controller.js"

const router = Router()

router
    .post("/sede/tutor/convivencia", controller.setSedeByTutorConvivencia )
    .post("/sede/psicologo", controller.setSedeByPsicologo )
    .post("/sede/grupo", controller.setSedeGrupo )

    .get("/alumnos/:id", controller.getAlumnos )
    .get("/alumno/:id", controller.getAlumno )
    .get("/alumno/dni/:id", controller.getAlumnoByDni )
    .post("/alumno", controller.setAlumno )
    .post("/alumnos", controller.setAlumnos )


export default router