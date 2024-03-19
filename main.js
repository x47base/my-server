const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 450;

app.use(cors({origin: '*'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + "/static/login.html"));
});

const router = require('./routes/v1/router');
app.route('/api/v1', router);

app.listen(PORT, () => console.log(`alive on http://localhost:${PORT}`))
