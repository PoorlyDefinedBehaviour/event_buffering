import express from "express"
import cors from "cors"
import { insert } from "./event_buffer"

const app = express()

const port = 7070

app.use(cors())

app.use(express.json())

app.post("/events", (request, response) => {
  response.send()
  insert(request.body)
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
