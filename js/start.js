$("#startP").on("pagecreate",function(){
  if(user.utils.getParam('user')==null){
    $.event.special.swipe.horizontalDistanceThreshold = 5;
    var count=$(".guide-img").children().length;
    $(".guide-img li:not(:first-child)").hide();
    $(".guide-img").children().on("swipeleft",function(evt){
      evt.preventDefault();
      var i=$(this).index();
      //++i>=count?i=0:i;
      if(++i>=count){
        alert("当前已是最后一页！");
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
  }
});