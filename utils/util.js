import {
  CryptoJS
} from 'cryptojs.js'
//加密
export const encrypt = (str, key) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key)
  let encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
//解密
export const decrypt = (str, key) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key)
  let decrypted = CryptoJS.DES.decrypt(str, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};
//加法
export const accAdd = (arg1, arg2) => {
  var r1, r2, m, c;
  try {
      r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
      r1 = 0;
  }
  try {
      r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
      r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
          arg1 = Number(arg1.toString().replace(".", ""));
          arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
          arg1 = Number(arg1.toString().replace(".", "")) * cm;
          arg2 = Number(arg2.toString().replace(".", ""));
      }
  } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
};
//减法
export const  accSub = (arg1, arg2) => {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
//乘法
export const accMul = (arg1, arg2) => {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
//url截取字符串
export const getUrlKey = function (name,path) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(path) || [, ""])[1].replace(/\+/g, '%20')) || null
};


export const withData = function (param) {
    return param < 10 ? '0' + param : '' + param;
}
export const getLoopArray =  function (start, end) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(withData(i));
    }
    return array;
}
export const getMonthDay = function (year, month) {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
  
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        array = getLoopArray(1, 31)
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        array = getLoopArray(1, 30)
        break;
      case '02':
        array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
        break;
      default:
        array = '月份格式不正确，请重新输入！'
    }
    return array;
}
export const getNewDateArry = function () {
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
      mont = withData(newDate.getMonth() + 1),
      date = withData(newDate.getDate()),
      hour = withData(newDate.getHours()),
      minu = withData(newDate.getMinutes()),
      seco = withData(newDate.getSeconds());
  
    return [year, mont, date, hour, minu, seco];
}
export const dateTimePicker = function (startYear, endYear, date) {
    var newDate = new Date();
    var year =newDate.getFullYear()
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
    var start = year;
    var end = year+2;
    // 默认开始显示数据
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);
    // console.log(dateTimeArray)
    dateTimeArray.forEach((current, index) => {
      dateTime.push(current.indexOf(defaultDate[index]));
    });
  
    return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
    }
}
//秒数显示格式
export const timeformat = function (second) {
    //秒数
    // var second = Math.floor(micro_second / 1000);
    //天数
    // var day = Math.floor(second / 3600 / 24);
    // 小时位 
    // var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hr = Math.floor((second) / 3600);
    if (hr < 10) {
      hr = "0" + hr
    } else {
      hr = hr
    }
    // 分钟位 
    // var min = Math.floor((second - hr * 3600 - day * 3600 * 24) / 60);
    var min = Math.floor((second - hr * 3600) / 60);
    if (min < 10) {
      min = "0" + min
    } else {
      min = min
    }
    // 秒位 
    // var sec = (second - hr * 3600 - min * 60 - day * 3600 * 24);
    var sec = (second - hr * 3600 - min * 60);
    if (sec < 10) {
      sec = "0" + sec;
    } else {
      sec = sec;
    }
    // console.log('timeformat',hr + ":" + min + ":" + sec)
    // return { hr: hr, min: min, sec: sec };
    return hr + ":" + min + ":" + sec;
};
