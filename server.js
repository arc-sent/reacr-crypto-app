const express = require('express');
const app = express()
const port = 80

app.use(express.static('frontentd/dist'))

app.listen(port , () => console.log('Сервер начал работу на 80 порте'))