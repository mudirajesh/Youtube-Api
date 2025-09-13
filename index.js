import express from "express"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()

app.get("/", (req, res) => res.send(" Hello you are alive"))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
