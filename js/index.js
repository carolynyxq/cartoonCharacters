function loadingPages(){
 window.location.href="start.html";
  // $.mobile.changePage ('start.html', 'pop', false, false);
}
var time=3;
function showTime(){
  time--;
  $(".time span").html(time+'s');
  time==0?clearInterval(timer):timer;
}
var timer=timer2=null;
$("#loading").on('pagecreate',function(){
  timer=setInterval('showTime()',1000);
  timer2=setInterval("loadingPages()",3000);
});
$(".time").on("click",function(){
  clearInterval(timer);
  timer=null;
  loadingPages();
});
