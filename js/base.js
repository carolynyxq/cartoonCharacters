var user={};
user.utils={
  setParam:function(name,value){localStorage.setItem(name,value)},
  getParam:function(name,value){ return localStorage.getItem(name,value)}
};

/*TODO:localstorage需要进一步处理，此处先搁置，先完成后面的页面*/