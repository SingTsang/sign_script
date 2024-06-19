/*
    name: "鸿星尔克"
    cron: 10 30 9 * * *
    脚本兼容: 金山文档， 青龙
    更新时间：20240619
*/

const logo = "艾默库 : https://github.com/imoki/sign_script"    // 仓库地址
let sheetNameSubConfig = "hxek"; // 分配置表名称（修改这里，这里填表的名称，需要和UPDATE文件中的一致，自定义的）
let pushHeader = "【鸿星尔克】";    //（修改这里，这里给自己看的，随便填）
let sheetNameConfig = "CONFIG"; // 总配置表
let sheetNamePush = "PUSH"; // 推送表名称
let sheetNameEmail = "EMAIL"; // 邮箱表
let flagSubConfig = 0; // 激活分配置工作表标志
let flagConfig = 0; // 激活主配置工作表标志
let flagPush = 0; // 激活推送工作表标志
let line = 21; // 指定读取从第2行到第line行的内容
var message = ""; // 待发送的消息
var messageArray = [];  // 待发送的消息数据，每个元素都是某个账号的消息。目的是将不同用户消息分离，方便个性化消息配置
var messageOnlyError = 0; // 0为只推送失败消息，1则为推送成功消息。
var messageNickname = 0; // 1为推送位置标识（昵称/单元格Ax（昵称为空时）），0为不推送位置标识
var messageHeader = []; // 存放每个消息的头部，如：单元格A3。目的是分离附加消息和执行结果消息
var messagePushHeader = pushHeader; // 存放在总消息的头部，默认是pushHeader,如：【xxxx】

var jsonPush = [
  { name: "bark", key: "xxxxxx", flag: "0" },
  { name: "pushplus", key: "xxxxxx", flag: "0" },
  { name: "ServerChan", key: "xxxxxx", flag: "0" },
  { name: "email", key: "xxxxxx", flag: "0" },
  { name: "dingtalk", key: "xxxxxx", flag: "0" },
  { name: "discord", key: "xxxxxx", flag: "0" },
]; // 推送数据，flag=1则推送
var jsonEmail = {
  server: "",
  port: "",
  sender: "",
  authorizationCode: "",
}; // 有效邮箱配置

// =================青龙适配开始===================

// 艾默库青龙适配代码
// v2.3.0  

var userContent=[["\u0063\u006f\u006f\u006b\u0069\u0065\u0028\u9ed8\u8ba4\u0032\u0030\u4e2a\u0029",")\u5426/\u662F(\u884C\u6267\u5426\u662F".split("").reverse().join(""),")\u5199\u586B\u4E0D\u53EF(\u79F0\u540D\u53F7\u8D26".split("").reverse().join("")]];var configContent=[["\u79F0\u540D\u7684\u8868\u4F5C\u5DE5".split("").reverse().join(""),"\u6CE8\u5907".split("").reverse().join(""),"\uFF09\u5426/\u662F\uFF08\u606F\u6D88\u8D25\u5931\u9001\u63A8\u53EA".split("").reverse().join(""),"\uFF09\u5426/\u662F\uFF08\u79F0\u6635\u9001\u63A8".split("").reverse().join("")],[sheetNameSubConfig,pushHeader,"\u5426","\u662f"]];var qlpushFlag=0x95dae^0x95dae;var qlSheet=[];var colNum=["\u0041","\u0042",'C',"\u0044",'E',"\u0046",'G',"\u0048",'I','J','K',"\u004c",'M','N','O',"\u0050",'Q'];qlConfig={"\u0043\u004f\u004e\u0046\u0049\u0047":configContent,"\u0053\u0055\u0042\u0043\u004f\u004e\u0046\u0049\u0047":userContent};var posHttp=0x2deb4^0x2deb4;var flagFinish=0xc03a3^0xc03a3;var flagResultFinish=0x84aad^0x84aad;var HTTPOverwrite={'get':function get(_0x2d8bb3,_0x46d699){_0x46d699=_0x46d699['headers'];let _0x26b0b9=userContent['length']-qlpushFlag;method="teg".split("").reverse().join("");resp=fetch(_0x2d8bb3,{"\u006d\u0065\u0074\u0068\u006f\u0064":method,"\u0068\u0065\u0061\u0064\u0065\u0072\u0073":_0x46d699})['then'](function(_0x5be286){return _0x5be286["\u0074\u0065\u0078\u0074"]()['then'](_0x46d6cc=>{return{'status':_0x5be286["\u0073\u0074\u0061\u0074\u0075\u0073"],"\u0068\u0065\u0061\u0064\u0065\u0072\u0073":_0x5be286["\u0068\u0065\u0061\u0064\u0065\u0072\u0073"],'text':_0x46d6cc,'response':_0x5be286,"\u0070\u006f\u0073":_0x26b0b9};});})["\u0074\u0068\u0065\u006e"](function(_0x5bffba){try{data=JSON["\u0070\u0061\u0072\u0073\u0065"](_0x5bffba['text']);return{"\u0073\u0074\u0061\u0074\u0075\u0073":_0x5bffba["\u0073\u0074\u0061\u0074\u0075\u0073"],"\u0068\u0065\u0061\u0064\u0065\u0072\u0073":_0x5bffba['headers'],'json':function _0x28b508(){return data;},"\u0074\u0065\u0078\u0074":function _0x305f42(){return _0x5bffba['text'];},'pos':_0x5bffba["\u0070\u006f\u0073"]};}catch(_0x1d096d){return{'status':_0x5bffba["\u0073\u0074\u0061\u0074\u0075\u0073"],"\u0068\u0065\u0061\u0064\u0065\u0072\u0073":_0x5bffba["\u0068\u0065\u0061\u0064\u0065\u0072\u0073"],"\u006a\u0073\u006f\u006e":null,'text':function _0x53ff4a(){return _0x5bffba['text'];},"\u0070\u006f\u0073":_0x5bffba["\u0070\u006f\u0073"]};}})["\u0074\u0068\u0065\u006e"](_0x17a4a5=>{_0x26b0b9=_0x17a4a5["\u0070\u006f\u0073"];flagResultFinish=resultHandle(_0x17a4a5,_0x26b0b9);if(flagResultFinish==(0xb3183^0xb3182)){i=_0x26b0b9+(0xc2527^0xc2526);for(;i<=line;i++){var _0x278288=Application["\u0052\u0061\u006e\u0067\u0065"]('A'+i)['Text'];var _0x3c6f3f=Application['Range']("\u0042"+i)["\u0054\u0065\u0078\u0074"];if(_0x278288=="".split("").reverse().join("")){break;}if(_0x3c6f3f=="\u662f"){console['log']('开始执行用户：'+i);flagResultFinish=0xaa0db^0xaa0db;execHandle(_0x278288,i);break;}}}if(_0x26b0b9==userContent["\u006c\u0065\u006e\u0067\u0074\u0068"]&&flagResultFinish==(0xcb6a1^0xcb6a0)){flagFinish=0x689c0^0x689c1;}if(qlpushFlag==(0x6518b^0x6518b)&&flagFinish==(0x4c357^0x4c356)){console["\u006c\u006f\u0067"]("\u9001\u63A8\u8D77\u53D1\u9F99\u9752".split("").reverse().join(""));message=messageMerge();const{sendNotify:_0xe173a2}=require("sj.yfitoNdnes/.".split("").reverse().join(""));_0xe173a2(pushHeader,message);qlpushFlag=-0x64;}})["\u0063\u0061\u0074\u0063\u0068"](_0x309831=>{console['error']('Fetch\x20error:',_0x309831);});},'post':function post(_0xc02ca1,_0x54fbc1,_0x149ff7,_0x1144b8){_0x149ff7=_0x149ff7['headers'];contentType=_0x149ff7['Content-Type'];contentType2=_0x149ff7["\u0063\u006f\u006e\u0074\u0065\u006e\u0074\u002d\u0074\u0079\u0070\u0065"];var _0x11ff98="";if(contentType!=undefined&&contentType!="".split("").reverse().join("")||contentType2!=undefined&&contentType2!=""){if(contentType=="dedocnelru-mrof-www-x/noitacilppa".split("").reverse().join("")){console["\u006c\u006f\u0067"]("\u6C42\u8BF7\u5355\u8868\u9001\u53D1\uFF0C\u5F0F\u683C\u5355\u8868\u4E3A\u6C42\u8BF7\u5230\u6D4B\u68C0".split("").reverse().join(""));_0x11ff98=dataToFormdata(_0x54fbc1);}else{try{console["\u006c\u006f\u0067"]("\u006a\u0073\u006f\u006e\u683c\u5f0f\u0064\u0061\u0074\u0061");_0x11ff98=JSON["\u0073\u0074\u0072\u0069\u006e\u0067\u0069\u0066\u0079"](_0x54fbc1);}catch{console['log']("atad\u5355\u8868\u975E\uFF0Cnosj\u975E".split("").reverse().join(""));_0x11ff98=_0x54fbc1;}}}else{console['log']('json格式data');_0x11ff98=JSON["\u0073\u0074\u0072\u0069\u006e\u0067\u0069\u0066\u0079"](_0x54fbc1);}if(_0x1144b8=="\u0067\u0065\u0074"||_0x1144b8=='GET'){let _0x34264d=userContent["\u006c\u0065\u006e\u0067\u0074\u0068"]-qlpushFlag;method="\u0067\u0065\u0074";resp=fetch(_0xc02ca1,{"\u006d\u0065\u0074\u0068\u006f\u0064":method,'headers':_0x149ff7})["\u0074\u0068\u0065\u006e"](function(_0x16fd04){return _0x16fd04["\u0074\u0065\u0078\u0074"]()["\u0074\u0068\u0065\u006e"](_0x12668f=>{return{'status':_0x16fd04['status'],"\u0068\u0065\u0061\u0064\u0065\u0072\u0073":_0x16fd04["\u0068\u0065\u0061\u0064\u0065\u0072\u0073"],"\u0074\u0065\u0078\u0074":_0x12668f,"\u0072\u0065\u0073\u0070\u006f\u006e\u0073\u0065":_0x16fd04,'pos':_0x34264d};});})['then'](function(_0x2e971c){try{_0x54fbc1=JSON["\u0070\u0061\u0072\u0073\u0065"](_0x2e971c['text']);return{'status':_0x2e971c['status'],'headers':_0x2e971c['headers'],'json':function _0x270f1d(){return _0x54fbc1;},'text':function _0x4fb355(){return _0x2e971c["\u0074\u0065\u0078\u0074"];},'pos':_0x2e971c['pos']};}catch(_0x4ef7af){return{'status':_0x2e971c['status'],'headers':_0x2e971c['headers'],'json':null,'text':function _0x2bdef5(){return _0x2e971c["\u0074\u0065\u0078\u0074"];},'pos':_0x2e971c['pos']};}})['then'](_0x3c49ec=>{_0x34264d=_0x3c49ec['pos'];flagResultFinish=resultHandle(_0x3c49ec,_0x34264d);if(flagResultFinish==(0xb519c^0xb519d)){i=_0x34264d+0x1;for(;i<=line;i++){var _0x5c62a4=Application['Range']('A'+i)["\u0054\u0065\u0078\u0074"];var _0x56f985=Application['Range']('B'+i)['Text'];if(_0x5c62a4==""){break;}if(_0x56f985=='是'){console['log']('开始执行用户：'+i);flagResultFinish=0x0;execHandle(_0x5c62a4,i);break;}}}if(_0x34264d==userContent["\u006c\u0065\u006e\u0067\u0074\u0068"]&&flagResultFinish==0x1){flagFinish=0x1;}if(qlpushFlag==(0x2b47e^0x2b47e)&&flagFinish==(0x69b02^0x69b03)){console['log']('青龙发起推送');message=messageMerge();const{sendNotify:_0x577a73}=require('./sendNotify.js');_0x577a73(pushHeader,message);qlpushFlag=-(0x7ed89^0x7eded);}})['catch'](_0x5e2bf2=>{console['error'](":rorre hcteF".split("").reverse().join(""),_0x5e2bf2);});}else{let _0x5cbad0=userContent['length']-qlpushFlag;method='post';resp=fetch(_0xc02ca1,{"\u006d\u0065\u0074\u0068\u006f\u0064":method,'headers':_0x149ff7,'body':_0x11ff98})['then'](function(_0xa3755a){return _0xa3755a['text']()["\u0074\u0068\u0065\u006e"](_0x382e98=>{return{'status':_0xa3755a['status'],'headers':_0xa3755a["\u0068\u0065\u0061\u0064\u0065\u0072\u0073"],'text':_0x382e98,'response':_0xa3755a,'pos':_0x5cbad0};});})['then'](function(_0x5b0090){try{_0x54fbc1=JSON["\u0070\u0061\u0072\u0073\u0065"](_0x5b0090['text']);return{'status':_0x5b0090['status'],'headers':_0x5b0090['headers'],'json':function _0x1b3637(){return _0x54fbc1;},'text':function _0x14e10f(){return _0x5b0090['text'];},'pos':_0x5b0090['pos']};}catch(_0x409099){return{'status':_0x5b0090['status'],'headers':_0x5b0090['headers'],'json':null,"\u0074\u0065\u0078\u0074":function _0x5f31d9(){return _0x5b0090['text'];},'pos':_0x5b0090['pos']};}})['then'](_0xc01b04=>{_0x5cbad0=_0xc01b04['pos'];flagResultFinish=resultHandle(_0xc01b04,_0x5cbad0);if(flagResultFinish==0x1){i=_0x5cbad0+(0xa3c39^0xa3c38);for(;i<=line;i++){var _0x4d1fd0=Application["\u0052\u0061\u006e\u0067\u0065"]('A'+i)['Text'];var _0x3f360e=Application['Range']('B'+i)['Text'];if(_0x4d1fd0==''){break;}if(_0x3f360e=='是'){console['log']('开始执行用户：'+i);flagResultFinish=0x4bc13^0x4bc13;execHandle(_0x4d1fd0,i);break;}}}if(_0x5cbad0==userContent['length']&&flagResultFinish==(0x4094b^0x4094a)){flagFinish=0x1;}if(qlpushFlag==(0x31f7d^0x31f7d)&&flagFinish==0x1){console['log']("\u9752\u9f99\u53d1\u8d77\u63a8\u9001");let _0x255d79=messageMerge();const{sendNotify:_0x3d85a6}=require("sj.yfitoNdnes/.".split("").reverse().join(""));_0x3d85a6(pushHeader,_0x255d79);qlpushFlag=-0x64;}})['catch'](_0x20f14a=>{console['error']('Fetch\x20error:',_0x20f14a);});}}};var ApplicationOverwrite={'Range':function Range(_0x46c86b){charFirst=_0x46c86b['substring'](0x817b0^0x817b0,0x1);qlRow=_0x46c86b['substring'](0x1cb32^0x1cb33,_0x46c86b['length']);qlCol=0x1;for(num in colNum){if(colNum[num]==charFirst){break;}qlCol+=0x1;}try{result=qlSheet[qlRow-0x1][qlCol-(0x552da^0x552db)];}catch{result='';}dict={'Text':result};return dict;},'Sheets':{'Item':function(_0x554731){return{'Name':_0x554731,'Activate':function(){flag=0x8784a^0x8784b;qlSheet=qlConfig[_0x554731];if(qlSheet==undefined){qlSheet=qlConfig['SUBCONFIG'];}console['log']('青龙激活工作表：'+_0x554731);return flag;}};}}};var CryptoOverwrite={'createHash':function createHash(_0x4246d2){return{'update':function _0x1ff122(_0x3e0b96,_0xd35e53){return{"\u0064\u0069\u0067\u0065\u0073\u0074":function _0x51310a(_0x486003){return{'toUpperCase':function _0x1899bb(){return{'toString':function _0x3e0c63(){let _0xf5b73f=require("sj-otpyrc".split("").reverse().join(""));let _0x256e3d=_0xf5b73f['MD5'](_0x3e0b96)['toString']();_0x256e3d=_0x256e3d['toUpperCase']();return _0x256e3d;}};},"\u0074\u006f\u0053\u0074\u0072\u0069\u006e\u0067":function _0x99d731(){const _0x104bc7=require('crypto-js');const _0x368301=_0x104bc7['MD5'](_0x3e0b96)['toString']();return _0x368301;}};}};}};}};function dataToFormdata(_0x260dab){result="".split("").reverse().join("");values=Object['values'](_0x260dab);values['forEach']((_0x2e2163,_0x581449)=>{key=Object['keys'](_0x260dab)[_0x581449];content=key+'='+_0x2e2163+'&';result+=content;});result=result['substring'](0xb9a4e^0xb9a4e,result['length']-(0xa044a^0xa044b));console['log'](result);return result;}function cookiesTocookieMin(_0x40b8de){let _0x156625=_0x40b8de;let _0x34b6a5=[];var _0x44e7e0=_0x156625['split']("\u0023");for(let _0x1c8741 in _0x44e7e0){_0x34b6a5[_0x1c8741]=_0x44e7e0[_0x1c8741];}return _0x34b6a5;}function checkEscape(_0x50f971,_0x52f7f2){cookieArrynew=[];j=0x754f8^0x754f8;for(i=0x0;i<_0x50f971['length'];i++){result=_0x50f971[i];lastChar=result['substring'](result["\u006c\u0065\u006e\u0067\u0074\u0068"]-0x1,result["\u006c\u0065\u006e\u0067\u0074\u0068"]);if(lastChar=='\x5c'&&i<=_0x50f971['length']-0x2){console['log']("\u7B26\u5B57\u4E49\u8F6C\u5230\u6D4B\u68C0".split("").reverse().join(""));cookieArrynew[j]=result['substring'](0x0,result['length']-0x1)+_0x52f7f2+_0x50f971[parseInt(i)+0x1];i+=0x1;}else{cookieArrynew[j]=_0x50f971[i];}j+=0x1;}return cookieArrynew;}function cookiesTocookie(_0x59c165){let _0x328f76=_0x59c165;let _0x2af96e=[];let _0x528b70=[];let _0xd3a274=_0x328f76['split']("\u0040");_0xd3a274=checkEscape(_0xd3a274,'@');for(let _0x2e6281 in _0xd3a274){_0x528b70=[];let _0x423ea4=Number(_0x2e6281)+(0xc35df^0xc35de);_0x2af96e=cookiesTocookieMin(_0xd3a274[_0x2e6281]);_0x2af96e=checkEscape(_0x2af96e,'#');_0x528b70['push'](_0x2af96e[0x511ab^0x511ab]);_0x528b70["\u0070\u0075\u0073\u0068"]('是');_0x528b70['push']('昵称'+_0x423ea4);if(_0x2af96e['length']>(0x401d9^0x401d9)){for(let _0x23c8b7=0x29e9f^0x29e9c;_0x23c8b7<_0x2af96e['length']+(0x73423^0x73421);_0x23c8b7++){_0x528b70['push'](_0x2af96e[_0x23c8b7-0x2]);}}userContent['push'](_0x528b70);}qlpushFlag=userContent['length']-(0xbf9fc^0xbf9fd);}var qlSwitch=0x0;try{qlSwitch=process['env'][sheetNameSubConfig];qlSwitch=0x1;console['log']("\u9F99\u9752\u4E3A\u5883\u73AF\u524D\u5F53\u3011+\u3010".split("").reverse().join(""));console['log']('【+】\x20开始适配青龙环境，执行青龙代码');try{fetch=require("hctef-edon".split("").reverse().join(""));console['log']('【+】系统无fetch，已进行node-fetch引入');}catch{console['log']("hctef\u751F\u539F\u6709\u5DF2\u7EDF\u7CFB\u3011+\u3010".split("").reverse().join(""));}Crypto=CryptoOverwrite;let flagwarn=0x0;const a='da11990c';const b="0b854f216a9662fb".split("").reverse().join("");encode=getsign(logo);let len=encode["\u006c\u0065\u006e\u0067\u0074\u0068"];if(a+"90ecd4ce".split("").reverse().join("")==encode['substring'](0x0,len/0x2)&&b==encode['substring']((0x5e24a^0x5e24e)*(0x4f42d^0x4f429),len)){console['log']('📢\x20'+logo);cookies=process['env'][sheetNameSubConfig];}else{console['log']("tpircs_ngis/ikomi/moc.buhtig//:sptth : \u7801\u4EE3\u5E93\u9ED8\u827E\u7528\u4F7F\u8BF7 \uDC1E\uD83D".split("").reverse().join(""));flagwarn=0x1;}let flagwarn2=0x1;const welcome='Welcome\x20to\x20use\x20MOKU\x20code';const mo=welcome["\u0073\u006c\u0069\u0063\u0065"](0xc5c06^0xc5c09,0x11)['toLowerCase']();const ku=welcome["\u0073\u0070\u006c\u0069\u0074"]('\x20')[0x4-(0x59925^0x59924)]['slice'](0xc945c^0xc945e,0x4);if(mo['substring'](0x0,0x1)=='m'){if(ku=='KU'){if(mo["\u0073\u0075\u0062\u0073\u0074\u0072\u0069\u006e\u0067"](0x6a93c^0x6a93d,0x2)==String['fromCharCode'](0x6f)){cookiesTocookie(cookies);flagwarn2=0x3dabf^0x3dabf;console['log']('💻\x20'+welcome);}}}let t=Date['now']();if(t>0xaa*0x186a0*0x186a0+0x45f34a08e){console["\u006c\u006f\u0067"]('🧾\x20使用教程请查看仓库notion链接');Application=ApplicationOverwrite;}else{flagwarn=0xbafc8^0xbafc9;}if(Date['now']()<0xc8*0x186a0*0x186a0){console['log']('✨\x20欢迎各种形式的贡献');HTTP=HTTPOverwrite;}else{flagwarn2=0xbd8d8^0xbd8d9;}if(flagwarn==0x1||flagwarn2==0x1){console['log']('🐞\x20请使用艾默库代码\x20:\x20https://github.com/imoki/sign_script');}}catch{qlSwitch=0x99a53^0x99a53;console['log']("\u6863\u6587\u5C71\u91D1\u4E3A\u5883\u73AF\u524D\u5F53\u3011+\u3010".split("").reverse().join(""));console['log']("\u7801\u4EE3\u6863\u6587\u5C71\u91D1\u884C\u6267\uFF0C\u6863\u6587\u5C71\u91D1\u914D\u9002\u59CB\u5F00 \u3011+\u3010".split("").reverse().join(""));}

// =================青龙适配结束===================

// =================金山适配开始===================
// 总推送
function push(message) {
  if (message != "") {
    message = messagePushHeader + message // 消息头最前方默认存放：【xxxx】
    let length = jsonPush.length;
    let name;
    let key;
    for (let i = 0; i < length; i++) {
      if (jsonPush[i].flag == 1) {
        name = jsonPush[i].name;
        key = jsonPush[i].key;
        if (name == "bark") {
          bark(message, key);
        } else if (name == "pushplus") {
          pushplus(message, key);
        } else if (name == "ServerChan") {
          serverchan(message, key);
        } else if (name == "email") {
          email(message);
        } else if (name == "dingtalk") {
          dingtalk(message, key);
        } else if (name == "discord") {
          discord(message, key);
        }
      }
    }
  } else {
    console.log("消息为空不推送");
  }
}


// 推送bark消息
function bark(message, key) {
  if (key != "") {
    let url = "https://api.day.app/" + key + "/" + message;
    // 若需要修改推送的分组，则将上面一行改为如下的形式
    // let url = 'https://api.day.app/' + bark_id + "/" + message + "?group=分组名";
    let resp = HTTP.get(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    sleep(5000);
  }
}

// 推送pushplus消息
function pushplus(message, key) {
  if (key != "") {
    // url = "http://www.pushplus.plus/send?token=" + key + "&content=" + message;
    url = "http://www.pushplus.plus/send?token=" + key + "&content=" + message + "&title=" + pushHeader;  // 增加标题
    let resp = HTTP.fetch(url, {
      method: "get",
    });
    sleep(5000);
  }
}

// 推送serverchan消息
function serverchan(message, key) {
  if (key != "") {
    url =
      "https://sctapi.ftqq.com/" +
      key +
      ".send" +
      "?title=消息推送" +
      "&desp=" +
      message;
    let resp = HTTP.fetch(url, {
      method: "get",
    });
    sleep(5000);
  }
}

// email邮箱推送
function email(message) {
  var myDate = new Date(); // 创建一个表示当前时间的 Date 对象
  var data_time = myDate.toLocaleDateString(); // 获取当前日期的字符串表示
  let server = jsonEmail.server;
  let port = parseInt(jsonEmail.port); // 转成整形
  let sender = jsonEmail.sender;
  let authorizationCode = jsonEmail.authorizationCode;

  let mailer;
  mailer = SMTP.login({
    host: server,
    port: port,
    username: sender,
    password: authorizationCode,
    secure: true,
  });
  mailer.send({
    from: pushHeader + "<" + sender + ">",
    to: sender,
    subject: pushHeader + " - " + data_time,
    text: message,
  });
  // console.log("已发送邮件至：" + sender);
  console.log("已发送邮件");
  sleep(5000);
}

// 邮箱配置
function emailConfig() {
  console.log("开始读取邮箱配置");
  let length = jsonPush.length; // 因为此json数据可无序，因此需要遍历
  let name;
  for (let i = 0; i < length; i++) {
    name = jsonPush[i].name;
    if (name == "email") {
      if (jsonPush[i].flag == 1) {
        let flag = ActivateSheet(sheetNameEmail); // 激活邮箱表
        // 邮箱表存在
        // var email = {
        //   'email':'', 'port':'', 'sender':'', 'authorizationCode':''
        // } // 有效配置
        if (flag == 1) {
          console.log("开始读取邮箱表");
          for (let i = 2; i <= 2; i++) {
            // 从工作表中读取推送数据
            jsonEmail.server = Application.Range("A" + i).Text;
            jsonEmail.port = Application.Range("B" + i).Text;
            jsonEmail.sender = Application.Range("C" + i).Text;
            jsonEmail.authorizationCode = Application.Range("D" + i).Text;
            if (Application.Range("A" + i).Text == "") {
              // 如果为空行，则提前结束读取
              break;
            }
          }
          // console.log(jsonEmail)
        }
        break;
      }
    }
  }
}

// 推送钉钉机器人
function dingtalk(message, key) {
  let url = "https://oapi.dingtalk.com/robot/send?access_token=" + key;
  let resp = HTTP.post(url, { msgtype: "text", text: { content: message } });
  // console.log(resp.text())
  sleep(5000);
}

// 推送Discord机器人
function discord(message, key) {
  let url = key;
  let resp = HTTP.post(url, { content: message });
  //console.log(resp.text())
  sleep(5000);
}

// =================金山适配结束===================

// =================共用开始===================
flagConfig = ActivateSheet(sheetNameConfig); // 激活推送表
// 主配置工作表存在
if (flagConfig == 1) {
  console.log("开始读取主配置表");
  let name; // 名称
  let onlyError;
  let nickname;
  for (let i = 2; i <= 100; i++) {
    // 从工作表中读取推送数据
    name = Application.Range("A" + i).Text;
    onlyError = Application.Range("C" + i).Text;
    nickname = Application.Range("D" + i).Text;
    if (name == "") {
      // 如果为空行，则提前结束读取
      break; // 提前退出，提高效率
    }
    if (name == sheetNameSubConfig) {
      if (onlyError == "是") {
        messageOnlyError = 1;
        console.log("只推送错误消息");
      }

      if (nickname == "是") {
        messageNickname = 1;
        console.log("单元格用昵称替代");
      }

      break; // 提前退出，提高效率
    }
  }
}

flagPush = ActivateSheet(sheetNamePush); // 激活推送表
// 推送工作表存在
if (flagPush == 1) {
  console.log("开始读取推送工作表");
  let pushName; // 推送类型
  let pushKey;
  let pushFlag; // 是否推送标志
  for (let i = 2; i <= line; i++) {
    // 从工作表中读取推送数据
    pushName = Application.Range("A" + i).Text;
    pushKey = Application.Range("B" + i).Text;
    pushFlag = Application.Range("C" + i).Text;
    if (pushName == "") {
      // 如果为空行，则提前结束读取
      break;
    }
    jsonPushHandle(pushName, pushFlag, pushKey);
  }
  // console.log(jsonPush)
}

// 邮箱配置函数
emailConfig();

flagSubConfig = ActivateSheet(sheetNameSubConfig); // 激活分配置表
if (flagSubConfig == 1) {
  console.log("开始读取分配置表");

    if(qlSwitch != 1){  // 金山文档
        for (let i = 2; i <= line; i++) {
            var cookie = Application.Range("A" + i).Text;
            var exec = Application.Range("B" + i).Text;
            if (cookie == "") {
                // 如果为空行，则提前结束读取
                break;
            }
            if (exec == "是") {
                execHandle(cookie, i);
            }
        }   
        message = messageMerge()// 将消息数组融合为一条总消息
        push(message); // 推送消息
    }else{
        for (let i = 2; i <= line; i++) {
            var cookie = Application.Range("A" + i).Text;
            var exec = Application.Range("B" + i).Text;
            if (cookie == "") {
                // 如果为空行，则提前结束读取
                break;
            }
            if (exec == "是") {
                execHandle(cookie, i);
                break;  // 只取一个
            }
        } 
    }

}

// 激活工作表函数
function ActivateSheet(sheetName) {
    let flag = 0;
    try {
      // 激活工作表
      let sheet = Application.Sheets.Item(sheetName);
      sheet.Activate();
      console.log("激活工作表：" + sheet.Name);
      flag = 1;
    } catch {
      flag = 0;
      console.log("无法激活工作表，工作表可能不存在");
    }
    return flag;
}

// 对推送数据进行处理
function jsonPushHandle(pushName, pushFlag, pushKey) {
  let length = jsonPush.length;
  for (let i = 0; i < length; i++) {
    if (jsonPush[i].name == pushName) {
      if (pushFlag == "是") {
        jsonPush[i].flag = 1;
        jsonPush[i].key = pushKey;
      }
    }
  }
}

// 将消息数组融合为一条总消息
function messageMerge(){
    // console.log(messageArray)
    let message = ""
  for(i=0; i<messageArray.length; i++){
    if(messageArray[i] != "" && messageArray[i] != null)
    {
      message += messageHeader[i] + messageArray[i] + " "; // 加上推送头
    }
  }
  if(message != "")
  {
    console.log(message)  // 打印总消息
  }
  return message
}

function sleep(d) {
  for (var t = Date.now(); Date.now() - t <= d; );
}

// 获取sign，返回小写
function getsign(data) {
    var sign = Crypto.createHash("md5")
        .update(data, "utf8")
        .digest("hex")
        // .toUpperCase() // 大写
        .toString();
    return sign;
}

// =================共用结束===================
 

// 生成GMT+8时间戳
function getDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 生成一定范围内的随机数
function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 鸿星尔克专用sign
function HXEK_SIGN(memberId, appid){
  signArry = []
  // appid = "wxa1f1fa3785a47c7d"
  secret = 'damogic8888'
  // GMT+8时间戳
  // timestamp = '2024-06-06 13:24:09'
  timestamp = getDateTimeString()
  // console.log(timestamp)
  // 随机数
  // random_int = 1475835
  random_int = randint(1000000, 9999999)
  // console.log(random_int)
  // 待加密字符串
  raw_string = "timestamp=" + timestamp + "transId=" +appid + timestamp + "secret=" + secret + "random=" + random_int + "memberId=" + memberId
  console.log(raw_string)
  // MD5加密
  sign = getsign(raw_string)
  // console.log(sign)
  signArry = [sign, random_int, timestamp]
  return signArry
}

// json转参数
function jsontoparam(jsonObj){
  // console.log(jsonObj)
  // "?xxx=xxx;xxx=xxx;"
  result = ""
  values = Object.values(jsonObj);
  values.forEach((value, index) => {
      key = Object.keys(jsonObj)[index]; // 获取对应的键
      // if(value == "[object Object]")
      // {
      //   value = "{}"
      // }
      // console.log(key + ": " + value);
      content = key + "=" + value + "&"
      result += content 
  });

  result = result.substring(0, result.length - 1);
  // console.log(result)
  return result
}

// 青龙适配
// 结果处理函数
function resultHandle(resp, pos){
    let messageSuccess = "";
    let messageFail = "";
    let messageName = "";
    // 推送昵称或单元格，还是不推送位置标识
    if (messageNickname == 1) {
        // 推送昵称或单元格
        messageName = Application.Range("C" + pos).Text;
        if(messageName == "")
        {
            messageName = "单元格A" + pos + "";
        }
    }
    posLabel = pos-2 ;  // 存放下标，从0开始
    messageHeader[posLabel] = messageName

    if (resp.status == 200) {
        resp = resp.json();
        console.log(resp)

        // （修改这里，这里就是自己写了，根据抓包的响应自行修改）
        
        // {"reqMethodName":{},"errcode":0,"errmsg":"请求成功","response":{"reqMethodName":{},"errcode":0,"errmsg":{},"response":{},"memberSign":{"continuousCount":2,"integralCount":10,"moreDays":1,"moreIntegral":10},"expirePoints":0,"points":230}}
        // {"reqMethodName":{},"errcode":0,"errmsg":"您今天已签到","response":{},"memberSign":{},"expirePoints":0,"points":0}}
        // {"reqMethodName":{},"errcode":4,"errmsg":"缺少参数memberId","response":{},"memberSign":{},"expirePoints":0,"points":0}}
        errcode = resp["errcode"]           // 通过resp["键名"]的方式获取值.假设响应数据是情况1，则读取到数字“0”
        // respmsg = resp["message"]  // 通过resp["键名"]的方式获取值，假设响应数据是情况1，这里取到的值就是“签到成功”
        if(errcode == 0)       // 通过code值来判断是不是签到成功，由抓包的情况1知道，0代表签到成功了,所以让code与0比较
        { 
            // 这里是签到成功
            memberSign = resp["response"]["memberSign"]
            continuousCount = memberSign["continuousCount"]
            integralCount = memberSign["integralCount"]
            points = resp["response"]["points"]
            content = "当前积分:" + points + "连续签到:" + continuousCount + "天 "  // // 给自己看的，双引号内可以随便写
            messageSuccess += content;
            console.log(content)
        }
        else if(errcode == 900001)
        {
            errmsg =  resp["errmsg"]
            content = errmsg // "今天已签到 "  // // 给自己看的，双引号内可以随便写
            messageSuccess += content;
            console.log(content)
        }else
        {
            // 这里是签到失败
            msg = "签到失败 "   // 给自己看的，可以随便写，如 msg = "失败啦！ " 。
            
            content = msg + " "     
            messageFail += content;
            console.log(content)
        }

    } else {
        content = "签到失败 "
        messageFail += content;
        console.log(content);
    }

    // 青龙适配，青龙微适配
    flagResultFinish = 1; // 签到结束

  // =================修改这块区域，区域结束=================

  sleep(2000);
  if (messageOnlyError == 1) {
    messageArray[posLabel] = messageFail;
  } else {
    messageArray[posLabel] = messageFail + " " + messageSuccess;
  }

  if(messageArray[posLabel] != "")
  {
    console.log(messageArray[posLabel]);
  }

  return flagResultFinish
}

// 具体的执行函数
function execHandle(cookie, pos) {
    // 清零操作，保证不同用户的消息的独立
    // 青龙适配，青龙微适配
    posHttp = 0 // 置空请求
    qlpushFlag -= 1 // 一个用户只会执行一次execHandle，因此可用于记录当前用户
    messageSuccess = "";
    messageFail = "";

  // =================修改这块区域，区域开始=================

  url1 = "https://hope.demogic.com/gic-wx-app/member_sign.json"; // 签到url（修改这里，这里填抓包获取到的地址）
  // url2 = "https://hope.demogic.com/gic-wx-app/get_member_grade_privileg.json"   // 获取用户信息
  appid = "wxa1f1fa3785a47c7d"  // 固定的

  memberId = Application.Range("D" + pos).Text;
  enterpriseId = Application.Range("E" + pos).Text;
//   console.log(memberId, enterpriseId)
  signArry = HXEK_SIGN(memberId, appid)
  sign = signArry[0]
  random_int = signArry[1]
  timestamp = signArry[2]
  transId = appid + timestamp
  console.log(sign, random_int, timestamp, transId)

  // （修改这里，这里填抓包获取header，全部抄进来就可以了，按照如下用引号包裹的格式，其中小写的cookie是从表格中读取到的值。）
  headers= {
    "Cookie": cookie,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.70",
    'Host': 'hope.demogic.com',
    'xweb_xhr': '1',
    'channelEntrance': 'wx_app',
    'sign': enterpriseId,
    'Referer': 'https://servicewechat.com/wxa1f1fa3785a47c7d/55/page-frame.html',
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  // （修改这里，这里填抓包获取data，全部抄进来就可以了，按照如下用引号包裹的格式。POST请求才需要这个，GET请求就不用它了）
  data = {
    "path":"pages/points-mall/member-task/member-task",
    "query":{},
    "scene":1256,
    "referrerInfo":{},
    "apiCategory":"default",
    'memberId': memberId,
    'cliqueId': '-1',
    'cliqueMemberId': '-1',
    'useClique': '0',
    'enterpriseId': enterpriseId,
    'appid': appid,
    'gicWxaVersion': '3.9.16',
    'random' : random_int,
    'sign' : sign,
    'timestamp' : timestamp,
    'transId' : transId,
  }
  // params = jsontoparam(params)
  // url1 = url1 + params
  // console.log(url1)

  // （修改这里，以下请求方式三选一即可)
  // // 请求方式1：POST请求，抓包的data数据格式是 {"aaa":"xxx","bbb":"xxx"} 。则用这个
  // resp = HTTP.post(
  //   url1,
  //   JSON.stringify(data),
  //   { headers: headers }
  // );

  // 请求方式2：POST请求，抓包的data数据格式是 aaa=xxx&bbb=xxx 。则用这个
  resp = HTTP.post(
    url1,
    data,
    { headers: headers }
  );

  // // 请求方式3：GET请求，无data数据。则用这个
  // resp = HTTP.get(
  //   url1,
  //   { headers: headers }
  // );
    
    // 青龙适配，青龙微适配
    if(qlSwitch != 1){  // 选择金山文档
        resultHandle(resp, pos)
    }

}