import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1]

    if (!token) {
      return res.status(401).json({
        error: "No token is provided",
      })
    }

    // decode
    const decode = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Something went wrong",
      message: error.message,
    })
  }
}
