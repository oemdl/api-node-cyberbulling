import express from "express"
import cors from "cors";

import appRouter from "./v1/routes/app.routes.js"
import adminRouter from "./v1/routes/admin.routes.js"
import directorRouter from "./v1/routes/director.routes.js"

const app = express()

app.use( cors() );
app.use( express.json() )

app.use("/api/v1/app", appRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/director", directorRouter)

app.listen(3000, ()=>{ console.log("running server") } )

/*
 Json Sedes , Sede  -> "director" y "tutor " { id, Nombres, Apellidos }

  Registrar incidencia
    lsta con inical - seccciones, primaria - seccciones
    lista de alumnos segun seccciones
    registro incidente
*/
