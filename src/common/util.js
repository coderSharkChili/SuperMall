export function debounce(func,delay){/* 防抖函数 debounce */
  let timer=null
  return function(...args){ // ...args 表示可以传多个参数
    if(timer) clearTimeout(timer)

    timer=setTimeout(() =>{
// .其实这里的this没有用。之所以用func.apply(this,arguments)而不用fn()，是因为要传参数，而且参数的个数不固定
      func.apply(this,args)
    },delay)
  }
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
