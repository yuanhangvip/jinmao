

// 封装数据请求相关代码
let commonUrl = 'https://api.jinmaowy.com/';
// let commonUrl = 'https://jmhtest.jinmaowy.com/'

const myRequest = (url,options,setOther)=>{
  let contentType = 'application/json';//默认值
  options.method = setOther.method || 'get';
  if(!!setOther.contentType){
    contentType = setOther.contentType
  }
  let headerObj = {
    'content-type':contentType, // 默认值
    'X-Sinochem-Info': `c_p=property_mp`,
  };
  if(setOther.params == 'params'){
    headerObj['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  if(url=='api/app/oauth/wechat/bindPhone' || url == 'api/app/oauth/passwordFree') {
    headerObj['Authorization'] = 'Basic cHJvcGVydHlfbXA6cHJvcGVydHlfbXA=';
    headerObj['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  let params = options.data
  wx.request({
    url: commonUrl+url, 
    data: params,
    method:options.method,
    header: headerObj,
    success (res) {
      console.log(res)
      options.success(res.data);
      // if (options.success) {
      //   if(res.data.status == 200){
      //     options.success(res.data);
      //   }
      // }
      // wx.hideLoading()
    },
    fail(res){
      console.log(res)
      if(options.fail){
       console.log(res);
      }
    }
  })
}

module.exports = {
  myRequest:myRequest,
  commonUrl:commonUrl,
}