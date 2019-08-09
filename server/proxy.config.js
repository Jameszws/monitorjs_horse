/*
 *   代理服务——处理dev环境跨域问题
 */
const target = {
    development:"http://localhost:8090",
    qa:"http://livechat.qa.ly.com",
    stage:"http://livechat.t.ly.com",
    product:"http://livechat.ly.com"
};

const proxy = [
    {
        url: '/post/jadmin',
        target: target,
    },
    {
        url: '/callcenterchat/ruleCategory/search',
        target: target,
    },
    {
        url: '/refund/web/oauth/*',
        target: target,
    },
    {
        url: '/livechatcust/api/*',
        target: target,
    },
    {
        url: '/robot/*',
        target: target,
    },
    {
        url:'/onlinecommon/*',
        target: target,
    },
    {
        url:'/customer/*',
        target: target,
    },
    {
        url:'/chat/*',
        target: target,
    }
];

module.exports = proxy;