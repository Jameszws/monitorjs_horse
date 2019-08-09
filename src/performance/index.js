/**
 * 监控工具
 */
import pagePerformance from "./performance.js";
import DeviceInfo from "../device";
import API from "../base/api.js";

class MonitorPerformance {

    constructor(){
        this.isPage = true; //是否上报页面性能数据
        this.isResource = true; //是否上报页面资源数据
        this.outTime = 50;
        this.config = {
            resourceList:[], //资源列表
            performance:{}, //页面性能列表
        };
    }

    /**
     * 记录页面信息
     * @param {*} params  {pageId ：页面标示,url ：上报地址}
     */
    record(params){
        setTimeout(()=>{
            if(this.isPage){
                this.config.performance = pagePerformance.getTiming();
            }
            if(this.isResource){
                this.config.resourceList = pagePerformance.getEntries();
            }
            let result = {
                time:new Date().getTime(),
                performance:this.config.performance,
                resourceList:this.config.resourceList,
                markUser:this.markUser(),
                markUv:this.markUv(),
                pageId:params?params.pageId:"",
                deviceInfo:this.getDeviceInfo()
            };
            console.log("report data =",result);
            //发送监控数据
            new API(params.url).report(result);
            this.clearPerformance();
        },this.outTime);
    }

    /**
     * 获取设备信息
     */
    getDeviceInfo(){
        try {
            let deviceInfo = DeviceInfo.getDeviceInfo();
            return JSON.stringify(deviceInfo);
        } catch (error) {
            console.log(error);
            return "";
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
        const today = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' 23:59:59';
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