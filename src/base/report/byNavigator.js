/**
 * 通过 Navigator 发送信息
 */
export default class ByNavigator {
    toReport(url,data) {
        try {
            data.reportWay = "navigator";
            navigator.sendBeacon && navigator.sendBeacon(url, data);
        } catch (error) {
            console.log(error);
        }
    }
}