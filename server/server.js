import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js'
import CardRoutes from './routes/card.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5500

const __dirname = path.resolve()

app.use(express.json())

app.use('/api/cards', CardRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    connectDB()
    console.log(`Server started at http://localhost:${PORT}`)
})

// Bsy2ZgEvHJHCeEDA