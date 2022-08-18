/**
 * 监控工具
 */
import pagePerformance from "./performance.js";
import DeviceInfo from "../device";
import BaseMonitor from "../base/baseMonitor";
import { ErrorLevelEnum,ErrorCategoryEnum } from "../base/baseConfig.js";
import API from "../base/api.js";

class MonitorPerformance extends BaseMonitor {

    constructor(options){
        super(options || {});
        options.isPage = options.isPage !== false;
        options.isResource = options.isResource !== false;
        this.isPage = options.isPage; //是否上报页面性能数据
        this.isResource = options.isResource; //是否上报页面资源数据
        this.usefulType = this.getSourceType(options);
        this.outTime = 50;
        this.config = {
            resourceList:[], //资源列表
            performance:{}, //页面性能列表
        };
        this.category = ErrorCategoryEnum.PERFORMANCE;
        this.pageId= options.pageId || "";
        this.url= options.url || "";
    }

    /**
     * 获取需要上报资源数据类型
     * @param {*} options 
     */
    getSourceType(options){
        let usefulType = []; //'navigation'
        options.isRScript !== false && usefulType.push('script');   //资源数据细分，是否上报script数据
        options.isRCSS !== false && usefulType.push('css');  //资源数据细分，是否上报CSS数据
        options.isRFetch !== false && usefulType.push('fetch');  //资源数据细分，是否上报Fetch数据
        options.isRXHR !== false && usefulType.push('xmlhttprequest');  //资源数据细分，是否上报XHR数据
        options.isRLink !== false && usefulType.push('link');  //资源数据细分，是否上报Link数据
        options.isRIMG !== false && usefulType.push('img');  //资源数据细分，是否上报IMG数据
        return usefulType;
    }

    /**
     * 记录页面信息
     * @param {*} options  {pageId ：页面标示,url ：上报地址}
     */
    record(){
        try {
            if(this.isPage){
                this.config.performance = pagePerformance.getTiming();
            }
            if(this.isResource){
                this.config.resourceList = pagePerformance.getEntries(this.usefulType);
            }
            let result = {
                curTime:new Date().format("yyyy-MM-dd HH:mm:ss"),
                performance:this.config.performance,
                resourceList:this.config.resourceList,
                markUser:this.markUser(),
                markUv:this.markUv(),
                pageId:this.pageId,
                deviceInfo:this.getDeviceInfo()
            };
            let extendsInfo = this.getExtendsInfo();
            let data = {
                ...extendsInfo,
                category:this.category,
                logType:ErrorLevelEnum.INFO,
                logInfo:JSON.stringify(result)
            };
            console.log("report data =",data);
            localStorage.setItem("page_performance",JSON.stringify(data));
            //发送监控数据
            new API(this.url).report(data);
            this.clearPerformance();
        } catch (error) {
            console.log("性能信息上报异常",error);
        }
    }

    randomString(len) {
        len = len || 10;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd + new Date().getTime();
    }

    /**
     * 获得markpage
     */
    markUser(){
        let psMarkUser = sessionStorage.getItem('ps_markUser')||'';
        if(!psMarkUser){
            psMarkUser = this.randomString();
            sessionStorage.setItem('ps_markUser',psMarkUser);
        }
        return psMarkUser;
    }

    /**
     * 获得Uv
     */
    markUv(){
        const date = new Date();
        let psMarkUv = localStorage.getItem('ps_markUv')||'';
        const datatime = localStorage.getItem('ps_markUvTime')||'';
        const today = date.format("yyyy/MM/dd 23:59:59");
        if( (!psMarkUv && !datatime) || (date.getTime() > datatime*1) ){
            psMarkUv = this.randomString();
            localStorage.setItem('ps_markUv',psMarkUv);
            localStorage.setItem('ps_markUvTime',new Date(today).getTime());
        }
        return psMarkUv;
    }
   
    clearPerformance(){
        if (window.performance && window.performance.clearResourceTimings) {
            performance.clearResourceTimings();
            this.config.performance = {};
            this.config.resourceList = '';
        }
    }

}

export default MonitorPerformance;