const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = config.port || 3000;

/*---         Middlewares          ---*/
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use(express.json());

/*---         App          ---*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
