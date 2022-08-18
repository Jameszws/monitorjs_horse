/**
 * 通过 XHR 发送信息
 */
export default class ByXHR {
    toReport(url,data) {
        try {
            data.reportWay = "xhr";
            let dataStr = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(dataStr);
        } catch (error) {
            console.log(error);
        }
    }
}