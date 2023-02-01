/*****  Задание 8 - Напишите эхо-сервер, который на запрос POST /echo будет возвращать тело запроса. *****/

'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post('/echo', (req, res) => {
  return res.send(req.body);
})

app.listen(port, () =>
  console.log(`🔊 Echo server started on port ${port}.\nTest at http://localhost:${port}`)
);


