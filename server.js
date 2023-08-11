const app = require("./src/app")
const db = require("./db/connection")
const port = 3000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
