import { AjaxError,ConsoleError,JsError,PromiseError,ResourceError,VueError } from './error';
import { AjaxLibEnum } from "./base/baseConfig.js";
import MonitorPerformance from './performance';
import MonitorNetworkSpeed from './performance/networkSpeed';
import './utils/extends';

class MonitorJS {

    constructor(){
        this.jsError = true;
        this.promiseError = true;
        this.resourceError = true;
        this.ajaxError = true;
        this.consoleError = false; //console.error默认不处理
        this.vueError =  false;
    }
    
    /**
     * 处理异常信息初始化
     * @param {*} options 
     */ 
    init(options){
        options = options || {};
        this.jsError = options.jsError || this.jsError;
        this.promiseError = options.promiseError || this.promiseError;
        this.resourceError = options.resourceError || this.resourceError;
        this.ajaxError = options.ajaxError || this.ajaxError;
        this.consoleError = options.consoleError || this.consoleError;
        this.vueError = options.vueError || this.vueError;
        let reportUrl = options.url;//上报错误地址
        let extendsInfo = options.extendsInfo || {};  //扩展信息（一般用于系统个性化分析）
        let param = { reportUrl, extendsInfo };
        if(this.jsError){
            new JsError(param).handleError();
        }
        if(this.promiseError){
            new PromiseError(param).handleError();
        }
        if(this.resourceError){
            new ResourceError(param).handleError();
        }
        if(this.ajaxError){
            new AjaxError(param).handleError(AjaxLibEnum.DEFAULT);
        }
        if(this.consoleError){
            new ConsoleError(param).handleError();
        }
        if(this.vueError && options.vue){
            new VueError(param).handleError(options.vue);
        }
    }

    /**
     * 监听页面性能
     * @param {*} options {pageId：页面标示,url：上报地址}
     */
    monitorPerformance(options){
        options = options || {};
        new MonitorNetworkSpeed(options).reportNetworkSpeed();
        let recordFunc = ()=>{
            new MonitorPerformance(options).record();
        };
        window.removeEventListener("unload",recordFunc);
        window.addEventListener("unload",recordFunc);
    }

}

export default MonitorJS;