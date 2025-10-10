import { Router } from "express"
import { controller } from "../../controllers/director.controller.js"

const router = Router()

router
    .post("/sede/tutor/convivencia", controller.setSedeByTutorConvivencia )
    .post("/sede/psicologo", controller.setSedeByPsicologo )

    .post("/sede/grupo", controller.setGrupoBySede )

    .post("/alumno", controller.setAlumno )
    .post("/alumnos", controller.setAlumnos )


export default router