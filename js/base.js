if(!window.localStorage){
  alert("您的浏览器不支持localStorage");
}else{
  var user={};
  user.ls={
    setParam:function(k,v){window.localStorage.setItem(k,v);},
    getParam:function(k,v){return window.localStorage.getItem(k,v);}
  };
}