var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/form' && req.method.toLowerCase() == 'post') {
    // Parse a form
    var form = new formidable.IncomingForm();
    var data={};
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Received form:\n\n');
      res.end(util.inspect(fields));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/form" enctype="multipart/form-data" method="post">'+
    '<label>E-mail:  </label>' + '<input type="email" name="email"></input><br>'+
    '<label>Password:</label>' + '<input type="password" name="password"></input><br>'+
    '<label>Remember me? </label>' + '<input type="checkbox" name="remember"></input><br>'+
    '<input type="submit" value="Log in"></input>'+
    '</form>'
  );
}).listen(80);