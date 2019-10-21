/*
 *   代理服务——处理dev环境跨域问题
 */
const target = {
    development:"http://localhost:8090",
    qa:"",
    stage:"",
    product:""
};

const proxy = [
    {
        url: '/post/jadmin',
        target: target,
    }
];

module.exports = proxy;