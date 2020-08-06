/**
 * 数据持久化
 */
class API {

    constructor(url){
        this.url = url;
    }
    
    /**
     * 上报信息 （默认方式）
     * isFetch ：是否优先通过fetch上报
     */
    report(data,isFetch){
        if(!this.checkUrl(this.url)){
            console.log("上报信息url地址格式不正确,url=",this.url);
            return;
        }
        console.log("上报地址："+this.url);
        this.sendInfo(data,isFetch);
    }

    /**
     * 发送消息
     */
    sendInfo(data,isFetch){
        let dataStr = JSON.stringify(data);
        try {
            if(fetch && isFetch){
                fetch(this.url,{
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method:"POST",
                    body:dataStr,
                    mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
                    keepalive:true
                });
                return;
            }
        } catch (error) {
            console.log("fetch请求异常",error);
        }
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST",this.url,true);
            //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(dataStr);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 通过img方式上报信息
     */
    reportByImg(data){
        if(!this.checkUrl(this.url)){
            console.log("上报信息url地址格式不正确,url=",this.url);
            return;
        }
        try {
            var img = new Image();
            img.src = this.url+'?v='+new Date().getTime()+'&' + this.formatParams(data);
        } catch (error) {
            console.log(error);
        }
    }

    
    /**
     * sendBeacon上报
     */
    reportByNavigator(data){
        navigator.sendBeacon && navigator.sendBeacon(this.url, data);
    }

    /*
     *格式化参数
     */
    formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }

    /**
     * 检测URL
     */
    checkUrl(url){
        if(!url){
            return false;
        }
        var urlRule =/^[hH][tT][tT][pP]([sS]?):\/\//;
        return urlRule.test(url);
    }

}
export default API;