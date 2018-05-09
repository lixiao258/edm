const express = require("express");
const app = express()
const config = require('./tools/config');
const bodyParser = require('body-parser'); //处理接受post请求
const webpack=require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

var infosArrs = [];
app.post('/bb', (req, res) => {
    var b = req.body['suggest'];
    b = JSON.parse(b);
    exports.doc2arr = b;
    var getInfo = require('./tools/processInfo.js');
    var timer = setInterval(function () {
        if(getInfo.infosArr.length == (b.length/2)){
            clearInterval(timer);
            infosArrs=getInfo.infosArr;
            res.send({status:'0',"config":config.settings.pathPublish,"infosArrs":infosArrs})
        }
    }, 500);
});

app.post('/cc', (req, res) => {
    let infosArr = req.body['infosArrs'];
    let confing=req.body['confing'];
    infosArr=JSON.parse(infosArr);
    console.log(confing,'111')
    var lists='';
    var imageSrc=''
    var filenames='';
    console.log(config.settings.debug)
    if(confing == "true"){
        console.log(1)
        imageSrc=config.settings.pathResTest;
        filenames='src'
    }else{
        imageSrc=config.settings.pathResPublish;
        filenames= config.settings.pathPublish
    }
    webpack({
        // Webpack 配置，和 webpack.config.js 文件一致
        entry: {
            main: __dirname + "/app/main.js"
        },//已多次提及的唯一入口文件
        output: {
            path: __dirname + "/public",//打包后的文件存放的地方
            filename: '[name].js',//打包后输出文件的文件名  -[hash]//生成后的文件名 为 a-2ea5b2e9b258a8bbba73.js，main-2ea5b2e9b258a8bbba73.js
            publicPath: 'http://cdn.com'  //publicPath 用于发布时，生成的羽毛
        },
        plugins: [
            new htmlWebpackPlugin({
                filename: filenames+"/index.html", //通过模板生成的文件名
                template: 'src/template.html',//模板路径
                inject: true, //是否自动在模板文件添加 自动生成的js文件链接,
                title:'EDM周刊',
                lists:infosArr,
                imageSrc:imageSrc,
                minify: {
                    removeComments: false //是否压缩时 去除注释
                }
            })
        ]
    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            // 构建过程出错
            console.log('出错',err)
        }
        // 成功执行完构建
        console.log('成功')
        res.send('ok')
    });


})



// console.log(exports.infosArrs)


//静态文件
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var server = app.listen(2354, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});