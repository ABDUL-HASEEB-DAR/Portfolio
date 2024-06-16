import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const port = 3000;
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/html/index.html');
    
})

app.listen( port || process.env.PORT, () => {
    if(process.env.port){
        console.log('server running on port ' + process.env.PORT);
    } else {
        console.log('server is running on port ' + port);
    }
});