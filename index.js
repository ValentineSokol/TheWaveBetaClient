const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/client/build`));
app.listen(process.env.PORT || 5000, '0.0.0.0');

app.get('*', (req, res) => res.sendFile(`${__dirname}/client/build/index.html`));