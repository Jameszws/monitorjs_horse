import BaseMonitor from "../base/baseMonitor.js"
import { ErrorCategoryEnum,ErrorLevelEnum } from "../base/baseConfig.js"
/**
 * 资源加载错误
 */
class ResourceError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 注册onerror事件
     */
    handleError(){
        window.addEventListener('error', (event) => {
            try {
                if(!event){
                    return;
                }
                this.category = ErrorCategoryEnum.RESOURCE_ERROR;
                let target = event.target || event.srcElement;
                var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
                if (!isElementTarget) {
                    return; // js error不再处理
                }
                this.level = target.tagName.toUpperCase() === 'IMG' ? ErrorLevelEnum.WARN : ErrorLevelEnum.ERROR;
                this.msg = "加载 "+target.tagName+" 资源错误";
                this.url = target.src || target.href;
                this.errorObj = target;
                this.recordError();
            } catch (error) {
                console.log("资源加载收集异常",error);
            }
        },true);
    }
}
export default ResourceError;