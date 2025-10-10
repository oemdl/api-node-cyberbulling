import { Router } from "express"
import { controller } from "../../controllers/admin.controller.js"

const router = Router()

router
    .get("/colegios", controller.getColegios )
    .get("/colegio/:id", controller.getColegio )
    .post("/colegio", controller.setColegio )

    .get("/sedes/:idColegio", controller.getSedes )
    .get("/sede/:id", controller.getSede )
    .post("/sede", controller.setSede )

    .post("/docentes", controller.setDocentes )
    .post("/docente", controller.setDocente )

    .post("/director", controller.setDirector )

export default router