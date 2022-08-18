import ByXHR from "./byXHR.js";
/**
 * 通过 Fetch 发送信息
 */
export default class ByFetch {
    toReport(url, data) {
        try {
            data.reportWay = "fetch";
            let dataStr = JSON.stringify(data);
            fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: dataStr,
                mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
                keepalive: true
            });
        } catch (error) {
            new ByXHR().toReport(url,data);
            console.log("fetch请求异常", error);
        }
    }
}