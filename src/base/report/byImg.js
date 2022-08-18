/**
 * 通过 IMG 发送信息
 */
export default class ByImg {

    toReport(url,data) {
        try {
            data.reportWay = "img";
            var img = new Image();
            img.src = url+'?v='+new Date().getTime()+'&' + this.formatParams(data);
        } catch (error) {
            console.log(error);
        }
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
}