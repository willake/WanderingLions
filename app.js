const express = require('express');
const compression = require('compression')
var app = express();    
const router = express.Router();
app.use(compression({filter: shouldCompress}))

var path = require('path')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/about/index.html'))
})

router.get('/contact', function(req, res) {
  res.sendFile(path.join(__dirname + '/contact/index.html'))
})

router.get('/work', function(req, res) {
  res.sendFile(path.join(__dirname + '/work/index.html'))
})

router.get('/blog', function(req, res) {
  res.sendFile(path.join(__dirname + '/blog/index.html'))
})

app.use('/images', express.static(__dirname + '/images'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/animations', express.static(__dirname + '/animations'))
app.use('/fonts', express.static(__dirname + '/fonts'))

app.use('/', router)

let server = app.listen(1200, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Listening at http://%s:%s', host, port)
})

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      return false
    }
   
    // fallback to standard filter function
    return compression.filter(req, res)
  }
