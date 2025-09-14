import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"

import { ConnectDB } from "./config/db.config.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()
ConnectDB()

app.use(bodyParser.json())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

app.use("/api/v1/user", userRoutes)

app.get("/", (req, res) => res.send(" Hello you are alive"))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
