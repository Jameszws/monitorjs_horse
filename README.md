### 1、简介
monitorjs_horse 是一款前端监控工具，主要包含下面几个方面信息监控：
* 1）前端异常监控；
* 2）页面性能监控；
* 3）设备信息采集；

### 2、异常捕获详情
* 1）js错误信息监控；
* 2）支持vue错误信息监控（需要将vue传入，并设置vueError:true）；
* 3）支持promise中未捕获异常信息的抓取；
* 4）支持ajax库（xhr）异常信息捕获；
* 5）支持console.error错误信息捕获;
* 6）支持资源错误信息捕获。

### 3、页面性能监控
* 1）重定向的时间；
* 2）DNS 查询时间；
* 3）DNS 缓存时间；
* 4）卸载页面的时间；
* 5）tcp连接耗时；
* 6）内容加载完成的时间；
* 7）解析dom树耗时；
* 8）白屏时间；
* 9）页面加载完成的时间；
* ...

### 4、设备信息采集
* 1）设备类型；
* 2）操作系统；
* 3）操作系统版本；
* 4）屏幕高、屏幕宽；
* 5）当前使用的语言-国家；
* 6）联网类型；
* 7）横竖屏；
* 8）浏览器信息；
* 9）浏览器指纹；
* 10）userAgent；
* ...

### 5、引入方式
```
1、支持es6方式引入
import { MonitorJS } from "monitorjs_horse";

2、支持commonjs方式引入
const MonitorJS = require("monitorjs_horse");

3、支持AMD方式引入
define(['monitorjs_horse'],(MonitorJS)=>{});

4、支持<script>标签引入方式
<script src="../node_modules/monitorjs_horse/dist/monitorjs.min.js"></script>
```

### 6、Usage
```
1）错误监控初始化代码：
new MonitorJS().init({
    url:"", //错误上报地址
    consoleError:true, //配置是否需要记录console.error错误信息
    vueError:true, //配置是否需要记录vue错误信息
    vue:Vue, //如需监控vue错误信息，则需要传入vue
    extendsInfo:{ //自定义扩展信息，一般用于数据持久化区分
        A:"", //自定义信息A（名称可自定义）可参考测试栗子 Module
        B:"", //自定义信息B（名称可自定义）可参考测试栗子 Category
        getDynamic:()=>{  //获取动态传参  1.4.5版本及以后支持该方式
            
        }
    }
});

2）参数说明：
{
    url ：错误上报地址
    jsError ：配置是否需要监控js错误 （默认true）
    promiseError ：配置是否需要监控promise错误 （默认true）
    resourceError ：配置是否需要监控资源错误 （默认true）
    ajaxError ：配置是否需要监控ajax错误 （默认true）
    consoleError ：配置是否需要监控console.error错误 （默认false）
    vueError ：配置是否需要记录vue错误信息 （默认false）
    vue ： 如需监控vue错误信息，则需要传入vue
    extendsInfo : { //自定义扩展信息，一般用于数据持久化区分
        A:"", //自定义信息A（名称可自定义）可参考测试栗子 Module
        B:"", //自定义信息B（名称可自定义）可参考测试栗子 Category
        getDynamic:()=>{  //获取动态传参  1.4.5版本及以后支持该方式
            
        }
    }
}
```

### 7、上报页面性能配置说明
```

1）页面性能信息采集代码：
new MonitorJS().monitorPerformance({
    pageId:"",  //页面唯一标示
    url:""  //信息采集上报地址
});

2）参数说明：
{
    pageId ：页面唯一标示
    url ：信息采集上报地址
}
```

### 8、监控返回信息结构
```
{
    SubCategory:"", //错误类型(枚举)：js_error 、resource_error、vue_error、promise_error、ajax_error、console_info、console_warn、console_error、unknow_error
    LogType: "Info", //日志类型(枚举) Error、Warning、Info
    LogInfo: "", //记录的信息
    DeviceInfo:"", //设备信息(JSON字符串)
    ...extendsInfo //自定义扩展信息，一般用于数据持久化区分【如：1、项目区分(Project)；2、错误大类区分（前端错误、后端错误 等等）】
}
```
### 9、页面性能监控返回信息结构
```
{
    time: 1565161213722, //上报时间
    deviceInfo: "", //设备信息
    markUser: "",  //用户标示
    markUv: "",  //uv采集
    pageId: "", //页面唯一标示
    performance: {
        analysisTime: 1825, //解析dom树耗时
        appcacheTime: 0,  //DNS 缓存时间
        blankTime: 8, //白屏时间
        dnsTime: 0, //DNS 查询时间
        domReadyTime: 53, //domReadyTime
        loadPage: 1878, //页面加载完成的时间
        redirectTime: 0, //重定向时间
        reqTime: 8, //请求时间
        tcpTime: 0, //tcp连接耗时
        ttfbTime: 1, //读取页面第一个字节的时间
        unloadTime: 0, //卸载页面的时间
    },
    resourceList: [
        {
            dnsTime: 1562.2399999992922, //dns查询耗时
            initiatorType: "img", //发起资源类型
            name: "https://pic.xiaohuochai.site/blog/chromePerformance1.png", //请求资源路径
            nextHopProtocol: "http/1.1", //http协议版本
            redirectTime: 0, //重定向时间
            reqTime: 1.1899999808520079, //请求时间
            tcpTime: 33.76000002026558, //tcp链接耗时
        }
    ],
}
```

### 10、使用时机
* 1) 普通项目，页面初始化时候，就可以完成初始化监控工具（最好在业务代码的前面，避免监控有漏）；
* 2) vue项目，需要在new Vue之前初始化监控工具，避免监控有漏；


### 11、版本变更说明
##### >= v-1.5.0 
* 1) console日志细分：console.info 、console.warning 、console.error ，且支持数据持久化；
* 2) 通过消息队列方式，优化消息持久化，防止多次记录console日志或者极端情况下消息被新消息顶替问题；
##### >= v-1.4.5
* 1) 支持动态获取参数

#### ……

#

##### 项目稳定，前端监控必不可少 ^_^
##### 欢迎留言，一起探讨前端问题 ~~
