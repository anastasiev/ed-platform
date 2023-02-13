import express from 'express';
import bodyParser from "body-parser";
import * as http from "http";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get('/greeting', function(req, res) {
    res.status(200).send({ id: 1, content: 'Hello, World' });
});

app.use(router);
app.listen(8080, function() {
    console.log('Express server listening on port ' + 8080);
});
