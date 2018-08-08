const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
  res.redirect('/presidents');
});

const presidentsRouter = require('./routes/presidents');
app.use('/presidents', presidentsRouter);

app.listen(8080, () => {
  console.log('Listening on 8080')
})