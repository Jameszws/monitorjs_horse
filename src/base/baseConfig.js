/**
 * 错误类型枚举
 */
export class ErrorCategoryEnum {
    /**
     * js 错误
     */
    static get JS_ERROR(){return "js_error";}

    /**
     * 资源引用错误
     */
    static get RESOURCE_ERROR(){return "resource_error";}

    /**
     * Vue错误
     */
    static get VUE_ERROR(){return "vue_error";}

    /**
     * promise 错误
     */
    static get PROMISE_ERROR(){return "promise_error";}

    /**
     * ajax异步请求错误
     */
    static get AJAX_ERROR(){return "ajax_error";}

    /**
     * 控制台错误console.info
     */
    static get CONSOLE_INFO(){return "console_info";}
    
    /**
     * 控制台错误console.warn
     */
    static get CONSOLE_WARN(){return "console_warn";}
    
    /**
     * 控制台错误console.error
     */
    static get CONSOLE_ERROR(){return "console_error";}

    /**
     * 跨域js错误
     */
    static get CROSS_SCRIPT_ERROR(){return "cross_srcipt_error";}
    
    /**
     * 未知异常
     */
    static get UNKNOW_ERROR(){return "unknow_error";}
    
    /**
     * 性能上报
     */
    static get PERFORMANCE(){return "performance";}
    
    /**
     * 网速上报
     */
    static get NETWORK_SPEED(){return "network_speed";}
}

/**
 * 错误level枚举
 */
export class ErrorLevelEnum {
    /**
     * 错误信息
     */
    static get ERROR(){return "Error";}

    /**
     * 警告信息
     */
    static get WARN(){return "Warning";}

    /**
     * 日志信息
     */
    static get INFO(){return "Info";}
}

/**
 * Ajax库枚举
 */
export class AjaxLibEnum {
    static get AXIOS(){ return 'axios';}
    static get DEFAULT(){ return 'default';}
}
