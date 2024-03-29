const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const corsOptions = {
    origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
//models
const db = require('./app/models')
//sequelize
db.connex.sync()
//  db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
//   });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
//test
app.get('/', (req, res) => {
    res.json({message: 'Welcome'})
})
//routes
require('./app/routes/product.route')(app)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
