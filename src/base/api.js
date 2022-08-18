import ByFetch from "./report/byFetch.js";
import ByImg from "./report/byImg.js";
import ByNavigator from "./report/byNavigator.js";
import ByXHR from "./report/byXHR.js";

/**
 * 数据持久化
 */
class API {

    constructor(url) {
        this.url = url;
    }

    /**
     * 上报信息 （默认方式）
     * isFetch ：是否优先通过fetch上报
     * isXHR ：是否优先通过XHR上报
     * isImg ：是否优先通过IMG上报
     * isNavigator ：是否优先通过Navigator上报
     */
    report(data, reportWay) {
        let defaultWay = { isFetch : false, isXHR: false, isImg: false, isNavigator: false };
        reportWay = reportWay || defaultWay;
        if (!this.checkUrl(this.url)) {
            console.log("上报信息url地址格式不正确,url=", this.url);
            return;
        }
        console.log("上报地址：" + this.url);
        this.sendInfo(data, reportWay);
    }

    /**
     * 发送消息
     */
    sendInfo(data, reportWay = {}) {
        let byFetch = new ByFetch();
        let byImg = new ByImg();
        let byXHR = new ByXHR();
        let byNavigator = new ByNavigator();
        if(reportWay.isImg) {
            byImg.toReport(this.url,data);
            return;
        }
        if(reportWay.isFetch) {
            byFetch.toReport(this.url,data);
            return;
        }
        if(reportWay.isXHR){
            byXHR.toReport(this.url,data);
            return;
        }
        if(reportWay.isNavigator) {
            byNavigator.toReport(this.url,data);
            return;
        }
        let isDefault = !!(reportWay.isFetch && reportWay.isImg && reportWay.isXHR && reportWay.isNavigator);
        if (!isDefault) {
            byImg.toReport(this.url,data);
            return;
        }
    }

    /**
     * 检测URL
     */
    checkUrl(url) {
        if (!url) {
            return false;
        }
        var urlRule = /^[hH][tT][tT][pP]([sS]?):\/\//;
        return urlRule.test(url);
    }

}
export default API;