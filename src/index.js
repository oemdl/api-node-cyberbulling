import express from "express"
import cors from "cors";
import adminRouter from "./v1/routes/admin.routes.js"

const app = express()

app.use(cors());
app.use( express.json() )
app.use("/api/v1/admin", adminRouter)

app.listen(3000, ()=>{ console.log("running server") } )