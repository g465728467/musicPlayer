var http = require('http');
var fs = require('fs');
var path = require('path')
var url = require('url')

var server = http.createServer(function(req,res){
    var pathObj = url.parse(req.url,true)
    switch(pathObj.pathname){
       case '/data.json':
        var dataJson = path.join(__dirname,pathObj.pathname) 
        fs.readFile(dataJson,'utf-8',function(err,data){
            if(err){
                res.send('文件读取失败');
            }else{
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.setHeader('Accept-Ranges','bytes')
                res.end(data)
            }
        })
       break;
       default:
           fs.readFile(path.join(__dirname,pathObj.pathname),function(e,data){
            if(e){
                res.writeHead(404,'not found')
                res.end('<h1>Not Found</h1>')
            }else{
                res.end(data)
           }
    })
    }
})
server.listen(8080)
