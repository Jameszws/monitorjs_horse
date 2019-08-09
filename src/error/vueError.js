import BaseMonitor from "../base/baseMonitor.js";
import { ErrorCategoryEnum,ErrorLevelEnum } from "../base/baseConfig.js";

/**
 * vue错误
 */
class VueError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 处理Vue错误提示
     */
    handleError(Vue){
        if(!Vue){
            return;
        }
        Vue.config.errorHandler = (error, vm, info)=>{
            try {
                let metaData = {
                    message:error.message,
                    stack:error.stack,
                    info:info,
                };
                if(Object.prototype.toString.call(vm) === '[object Object]'){
                    metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
                    metaData.propsData = vm.$options.propsData;
                }
                this.level = ErrorLevelEnum.WARN;
                this.msg = JSON.stringify(metaData);
                this.category = ErrorCategoryEnum.VUE_ERROR;
                this.recordError();
            } catch (error) {
                console.log("vue错误异常",error);
            }
        }
    }
}
export default VueError;