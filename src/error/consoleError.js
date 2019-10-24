import BaseMonitor from "../base/baseMonitor.js";
import { ErrorCategoryEnum,ErrorLevelEnum } from "../base/baseConfig.js"
/**
 * console.error异常
 */
class ConsoleError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 处理console事件
     */
    handleError(){
        this.registerInfo();
        this.registerWarn();
        this.registerError();
    }

    /**
     * 处理信息
     */
    registerInfo(){
        let t = this;
        console.tInfo=function(){
            t.handleLog(ErrorLevelEnum.INFO,ErrorCategoryEnum.CONSOLE_INFO,arguments);
        }
    }

    /**
     * 处理警告
     */
    registerWarn(){
        let t = this;
        console.tWarn=function(){
            t.handleLog(ErrorLevelEnum.WARN,ErrorCategoryEnum.CONSOLE_WARN,arguments);
        }
    }

    /**
     * 处理错误
     */
    registerError(){
        let t = this;
        console.tError=function(){
            t.handleLog(ErrorLevelEnum.ERROR,ErrorCategoryEnum.CONSOLE_ERROR,arguments);
        }
    }

    /**
     * 处理日志
     */
    handleLog(level,category,args){
        try {
            this.level = level;
            let params = [...args];
            this.msg = params.join("\r\n"); //换行符分割
            this.url = location.href;   //当前地址
            this.category = category;
            this.recordError();
        } catch (error) {
            console.log("console统计错误异常",level,error);
        }
    }

}

/**
 * 初始化console事件
 */
(function(){  
    //创建空console对象，避免JS报错  
    if(!window.console){
        window.console = {};
    }
    let funcs = ['tInfo','tWarn','tError'];
    funcs.forEach((func,index)=>{
        if(!console[func]){
            console[func] = function(){};
        }
    });
})()

export default ConsoleError;