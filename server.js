
   
const express = require('express');
const app = express();

const htmlRoute = require('./routes/html-routes');
const apiRoute = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));