import { Router } from "express"
import { controller } from "../../controllers/director.controller.js"

const router = Router()

router
    .post("/sede/tutor/convivencia", controller.setSedeByTutorConvivencia )
    .post("/sede/psicologo", controller.setSedeByPsicologo )

    .post("/grupo", controller.setGrupo )

    .post("/alumno", controller.setAlumno )
    .post("/alumnos", controller.setAlumnos )


export default router