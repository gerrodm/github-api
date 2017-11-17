var express = require('express')

var logger = require('morgan')

var bodyParser = require('body-parser')

var axios = require('axios')



var app = express()



// Configuration (setup for our app)

app.set('view engine', 'ejs')

app.use(logger('dev'))



app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))



app.set('views', __dirname + '/public')



app.get('/', function(request, response){

    response.render('home.ejs')

})



app.post('/results', function(request, response){

    var bae = request.body.bae

    var github = request.body.github

    

    axios.get('https://api.github.com/users/'+github)

    .then(function(resp){ 

        return resp.data 

    })

    .then(function(data){

        response.render('results.ejs', {

            myBoo: bae,

            myGithub: github,

            myData: data

        })        

    })

})



var port = process.env.PORT || 8080



app.listen(port, function(){

  console.log('App is running on port ' + port)

})

