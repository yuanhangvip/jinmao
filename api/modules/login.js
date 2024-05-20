import service from '../../utils/httpService';

// 发送二维码
export const sendSmsCode = (data) => service.myRequest('api/app/wechat/sendSmsCode', data,{method:'get'});

// 登录
export const bindPhone = (data) => service.myRequest('api/app/oauth/wechat/bindPhone', data,{method:'post',contentType:'application/x-www-form-urlencoded'});