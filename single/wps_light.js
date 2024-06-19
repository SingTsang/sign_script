// WPS（轻量版、手机端签到）
// 需要配合表格
// 独立脚本

// 推送bark消息
function bark(message){
  let push = Application.Range("E"+2).Text
  let bark_id = Application.Range("D"+2).Text
  if(push == "是" && bark_id != ""){
    let url = 'https://api.day.app/' + bark_id + "/" + message;
    // 若需要修改推送的分组，则将上面一行改为如下的形式
    // let url = 'https://api.day.app/' + bark_id + "/" + message + "?group=分组名";
    let resp = HTTP.get(url,
      {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    )
    sleep(5000)
  }
}

// 推送pushplus消息
function pushplus(message){
  let push = Application.Range("G"+2).Text
  let token = Application.Range("F"+2).Text
  if(push == "是" && token != ""){
    url = 'http://www.pushplus.plus/send?token=' + token + '&content=' + message
    let resp = HTTP.fetch(url, {
      method: "get"
    })
    sleep(5000)
  }
}

// 推送serverchan消息
function serverchan(message){
  let push = Application.Range("I"+2).Text
  let key = Application.Range("H"+2).Text
  if(push == "是" && key != ""){
    url = "https://sctapi.ftqq.com/" + key + ".send"  + "?title=消息推送"  + "&desp=" + message
    let resp = HTTP.fetch(url, {
      method: "get"
    })
    sleep(5000)
  }
}

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

var message= "【wps轻量版】";
var line = 21;  // 默认支持20个账户
for (let i = 2; i <= line; i++){
  var cookie = Application.Range("A"+i).Text
  var exec = Application.Range("B"+i).Text
  if(cookie != "" && exec == "是"){
        url = "https://vip.wps.cn/sign/v2"
        headers = {
            "Cookie": "wps_sid=" + cookie,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"
        }
        data = {
            "platform": "8",
            "captcha_pos": "137.00431974731889, 36.00431593261568",
            "img_witdh": "275.164",
            "img_height": "69.184"
        } 

        let resp = HTTP.fetch(url, {
          method: "post",
          headers: headers,
          data: data
        })

        try{
          resp = resp.json()
          var result = resp["result"]
          var msg = resp["msg"]
          message = message + "单元格A" + i + msg + ",签到成功 "
        }catch{
          message = message + "单元格A" + i + "签到失败 "
        }
        console.log(resp)
      sleep(2000)
  }
}

bark(message);
pushplus(message);
serverchan(message);
