import express from "express"

const router = express.Router()

router.post("/signup", (req, res) => {
  res.send("Hello bhai kya haal chaal aap log ka")
})

export default router
