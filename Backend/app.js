import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import customerRoutes from "./routes/customer.routes.js"
import salesRoutes from "./routes/sales.routes.js"

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de usuarios 🧪")
})

app.use("/", authRoutes)
app.use("/", userRoutes)

app.use("/", customerRoutes)
app.use("/", salesRoutes)

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
)

export default app