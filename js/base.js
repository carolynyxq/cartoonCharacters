var user={};
user.utils={
  setParam:function(name,value){localStorage.setItem(name,value)},
  getParam:function(name,value){ return localStorage.getItem(name,value)}
};

/*TODO:localstorage��Ҫ��һ�������˴��ȸ��ã�����ɺ����ҳ��*/