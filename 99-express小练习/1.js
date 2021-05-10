const express = require('express')

const app = express()

app.use(express.static('code'))
app.use('/data', express.static('data'))

app.listen(80, () => {
    console.log('express running at http://127.0.0.1')
})