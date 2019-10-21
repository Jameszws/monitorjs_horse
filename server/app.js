/**
 * 开发环境NODE EXPRESS服务
 */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');//http-proxy的express中间件
const querystring = require('querystring'); //querystring用来字符串化对象或解析字符串
const bodyParser = require('body-parser');  //bodyParser中间件用来解析http请求体
const proxyConfig = require('./proxy.config.js');
const opn = require('opn');
var webpackConfig = require('../config/webpack.dev.config.js');
const os = require('os');

const app = express();
const router = express.Router();
const NODE_ENV = process.env.NODE_ENV ;

var appInfo = {

    init:function(){
        this.setBaseInfo();
        this.setProxy();  //设置代理
        this.setWebpack();  //设置webpack配置    
        this.loadRoute();  //加载路由
    },
    createServer:function(){
        var ip = this.getIPAdress() || 'localhost';
        var server = app.listen(app.get('port'), function() {
            var port = server.address().port;
            console.log("express server listening on %s : %s", ip, port);
            opn('http://' + ip + ":" + port + '/#/?p=3&sourceType=16&openid=oOCyauG9ag5v3AJ7PdVc2Vc0Oe-M');
        });
    },
    
    setBaseInfo:function(){
        app.use('/src', express.static(path.resolve(__dirname, "..","src")));
        app.set('port', 9010);
        app.engine('.html', require('ejs').__express);
        app.set('view engine', 'html');
        app.set('views', path.resolve(__dirname, '..'));    //设置页面路径
    },

    /**
     * 设置代理
     */
    setProxy:function(){
        proxyConfig.forEach(function (item) {
            console.log("item.target[NODE_ENV]="+item.target[NODE_ENV])
            app.use(item.url, proxy({
                target: item.target[NODE_ENV],
                changeOrigin: true,
            }));
        });
        
        app.use(bodyParser.json()); // 解析 application/json
        app.use(bodyParser.urlencoded({ extended: false }));  // 解析 application/x-www-form-urlencoded
    },
    
    /**
     * 设置webpack配置
     */
    setWebpack:function(){
        Object.keys(webpackConfig.entry).forEach(function(key){
            webpackConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true');
        });
        
        var compiler = webpack(webpackConfig);
        app.use(webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            noInfo: true,
            stats: {
                colors: true
            }
        }));
        app.use(webpackHotMiddleware(compiler));
    },
    
    /**
     * 加载路由
     */
    loadRoute:function(){
        router.get('*', function(req, res){
            res.render('src/index.html', {
                env: NODE_ENV
            });
        });
        
        app.use(router);
    },

    getIPAdress:function() {
        var interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}

appInfo.init();
appInfo.createServer();