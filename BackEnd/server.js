const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});


//configurations to find these important files
//in build folder
//find the directory
app.use(express.static(path.join(__dirname,'../build')));

//find static folder
//told the server where these folders are
app.use('/static',express.static(path.join(__dirname, 'build/staic')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
const e = require('express');

const strConnection = 'mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

const movieSchema = new mongoose.Schema({
    Title:String,
    Year:String,
    Poster:String
});

const movieModel = mongoose.model('martindfgdfgdfg', movieSchema);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    });
    res.send('Data Sent to Server!')
})

app.get('/api/movies/:id',(req, res)=>{
    console.log(req.params.id);

    movieModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

app.delete('/api/movies/:id', (req, res)=>{
    console.log('Deleteing : '+req.params.id);

    movieModel.deleteOne({_id:req.params.id},
        (error, data)=>{
            if(error)
                res.send(error)
            res.send(data);
        })
})

app.put('/api/movies/:id',(req, res)=>{
    console.log('update');
    console.log(req.body);
    console.log("Updating: " + req.params.id);

    movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })

})



app.get('/api/movies', (req, res) => {
    movieModel.find((err, data)=>{
        res.json(data);
    })
          
           // https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg
      
})


//production build of our front end
//npm build will add a folder 
//it includes index.html



//for any other root points will return the index.html file
//sending a file and joining two paths
// /../ means come out of the backend folder and go into build folder
// * will return the html file to any url except for the root points above 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})