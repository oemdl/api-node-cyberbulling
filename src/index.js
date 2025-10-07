import express from "express"
import adminRouter from "./v1/routes/admin.routes.js"

const app = express()

app.use( express.json() )
app.use("/api/v1/admin", adminRouter)


app.use( express.json() )
app.listen(3000, ()=>{ console.log("running server") } )