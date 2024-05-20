import service from '../../utils/httpService';
export const getUserPhoneNumber =(data) => service.myRequest('api/tool/wechat/getUserPhoneNumber',data,{method:'get'})

export const passwordFree =(data) => service.myRequest('api/app/oauth/passwordFree',data,{method:'post'})