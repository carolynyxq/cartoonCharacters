//start.html
$("#startP").on("pagecreate",function(){
  if(/*user.utils.getParam('user')==null*/true){
    $.event.special.swipe.horizontalDistanceThreshold = 3;
    var count=$(".guide-img").children().length;
    $(".guide-img li:not(:first-child)").hide();
    $(".guide-img").children().on("swipeleft",function(evt){
      evt.preventDefault();
      var i=$(this).index();
      //++i>=count?i=0:i;
      if(++i>=count){
        confirm("当前已是最后一页,是否进入记事薄！")?window.location.href="main.html":0;
        i=0;
      }else{
        $(".guide-img li").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
        $(".guide-index span").eq(i).toggleClass("on").siblings().removeClass("on");
      }
    });
    $(".guide-img").children().on("swiperight",function(evt) {
      evt.preventDefault();
      var i = $(this).index();
      //--i<0?i=1:i;
      if (--i < 0) {
        alert("当前已是第一页！");
        i = 0;
      } else {
        $(".guide-img li").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
        $(".guide-index span").eq(i).toggleClass("on").siblings().removeClass("on");
      }
    });
    $(".guide-img").children().on("tap",function(evt){
      evt.preventDefault();
      var i=$(this).index();
      //++i>=count?i=0:i;
      if(++i>=count){
        confirm("当前已是最后一页,是否进入记事薄！")?window.location.href="main.html":0;
        i=0;
      }else{
        $(".guide-img li").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
        $(".guide-index span").eq(i).toggleClass("on").siblings().removeClass("on");
      }
    });
  }
});
//mian.html
$("#noteP").on("pagecreate",function(){
  //alert(localStorage.length);
  var $key="";
  var count=0;
  var acount=0;
  var bcount=0;
  for(var i=0;i<window.localStorage.length;i++){
    $key=localStorage.key(i);
    if($key.substring(0,4)=='note'){
      var notedata=JSON.parse(user.ls.getParam($key));
      //console.log(notedata);
      notedata.type=='a'?acount++:notedata.type=='b'?bcount++:0;
    }
  }
  count=parseInt(acount)+parseInt(bcount);
  //alert("count"+count+";a"+acount+";b"+bcount);
  var strHtml="";
  strHtml+='<li data-role="list-divider">我的所有笔记<span class="ui-li-count">'+count+'</span></li>';
  strHtml+='<li><a href="list.html" class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" data-id="a" data-name="技术笔记">技术笔记</a><span class="ui-li-count">'+acount+'</span></li>';
  strHtml+='<li><a href="list.html" class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" data-id="b" data-name="生活笔记">生活笔记</a><span class="ui-li-count">'+bcount+'</span></li>';
  $("#allNotes").html(strHtml);
  $("#allNotes").delegate("li a","click",function(evt){
    user.ls.setParam('link_type',$(this).data('id'));
    user.ls.setParam('type_name',$(this).data('name'));
  });
});
//list.html
$("#listP").on('pagecreate',function(){
  var type=user.ls.getParam("link_type");
  var name=user.ls.getParam("type_name");
  var key="";
  var strHtml="";
  var sum=0;
  for(var i=0;i<localStorage.length;i++){
    key=localStorage.key(i);
    if(key.substring(0,4)=='note'){
      var getData=JSON.parse(user.ls.getParam(key));
      if (getData.type==type){
        strHtml+='<li data-icon="false"><a href="detail.html" rel="external" data-ajax="false" class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-id="'+getData.nid+'">'+getData.title+'</a></li>';
        sum++;
      }
    }
  }
  var strTitle='<li data-role="list-divider">'+name+'<span class="ui-li-count">'+sum+'</span></li>';
  $("#noteList").html(strTitle+strHtml);
  $("#noteList").delegate("li a","click",function(evt){
    user.ls.setParam('list_link_id',$(this).data('id'));
  });
});
//detail.html
$("#detailP").on("pagecreate",function(){
  var id=user.ls.getParam("list_link_id");
  var listData=JSON.parse(user.ls.getParam(id));
  $("#noteT").html(listData.type="a"?"技术笔记":"生活笔记");
  $("#title").html(listData.title);
  $("#content").html(listData.content);
  $(this).delegate("#del","click",function(evt){
    if(confirm("确定要删除么？")){
      localStorage.removeItem(id);
      window.location.href="list.html";
    }
  });
});
//editNote.html
$("#editNoteP").on('pagecreate',function(){
  var editNote=JSON.parse(user.ls.getParam(user.ls.getParam('list_link_id')));
  //将从localStorage中获取到的笔记内容显示到页面上
  $("#hidtype").val(editNote.type);
  $("#txt-title").val(editNote.title);
  $("#txta-content").val(editNote.content);
  if(editNote.type=='a'){
    $("#lbl-type-0").removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
  }else if(editNote.type=='b'){
    $("#lbl-type-1").removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
  }
  //将修改内容覆盖保存到localStorage中
  $("input[type='radio']").bind('change',function(){
    $("#hidtype").val(this.value);
  });
  $("div[data-role='header']").delegate("a","click",function(evt){
    if($("#txt-title").val().length>0 && $("#txta-content").val().length>0){
      var strnid=editNote.nid;
      var note=new Object();
      note.nid=strnid;//笔记编号
      note.type=$("#hidtype").val();//笔记类型
      note.title=$("#txt-title").val();//笔记标题
      note.content=$("#txta-content").val();//笔记内容
      var jsonnote=JSON.stringify(note);
      user.ls.setParam(strnid,jsonnote);
      window.location.href="list.html";
    }else{
      alert("笔记内容不能为空！");
    }
  });
});
//addNote.html
$("#addNoteP").on('pagecreate',function(){
  //获取笔记的类型
  $("input[type='radio']").bind('change',function(){
    $("#hidtype").val(this.value);
    //console.log($("#hidtype").val());
  });
  //保存笔记到localstorage
  $("div[data-role='header']").delegate("a","click",function(evt){
    if($("#txt-title").val().length>0 && $("#txta-content").val().length>0){
      var strnid="note_"+rndNum(3);
      var note=new Object();
      note.nid=strnid;//笔记编号
      note.type=$("#hidtype").val();//笔记类型
      note.title=$("#txt-title").val();//笔记标题
      note.content=$("#txta-content").val();//笔记内容
      var jsonnote=JSON.stringify(note);
      user.ls.setParam(strnid,jsonnote);
      window.location.href="list.html";
    }else{
      confirm("笔记内容为空,未保存，确定返回！");
    }
  });
  function rndNum(n){
    var a="";
    for(var i=0;i<n;i++){
      a+=Math.floor(Math.random()*10);
    }
    return a;
  }
});