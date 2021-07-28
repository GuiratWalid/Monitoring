const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const error = require('./APIs/error.js');
const visitor = require('./APIs/visitor.js');
const account = require('./APIs/account.js');
const useCase = require('./APIs/useCase.js');
const update = require('./APIs/update.js');

let app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(error);
app.use(visitor);
app.use(account);
app.use(useCase)
app.use(update);

app.listen(port, () => `Server running on port ${port} `);