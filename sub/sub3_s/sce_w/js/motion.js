//--------------top_btn효과---------------------
setInterval("scroll()",0);
function scroll(){

   if( $(window).scrollTop()>1000 ){
      $("#container>p").fadeIn(200);
     }else{ $("#container>p").fadeOut(200); }
};



$(function(){ 

  $(".example1 li button").click(function(){
    $(".example1 p:eq(1) img").attr("src", $(this).children("img").attr("src"));
    $(".example1 p:eq(2)").text($(this).children("img").attr("alt"));
  });

  $(".example2 button").mouseover(function(){
     $(this).children("img").attr("src","images/btn_hover.png");    
  });
  $(".example2 button").mouseleave(function(){
     $(this).children("img").attr("src","images/btn.png");    
  });   
   
  $(".example2 li").click(function(){
     $(".example2 li img").attr("src","images/btn.png");
     $(this).children("button").children("img").attr("src","images/btn_hover.png");
     $(".example2 p:eq(1) img").attr("src", "images/img" + ($(this).index()+1) + ".jpg");
     $(".example2 p:eq(2)").text($(this).children("button").children("img").attr("alt"));
 });
   
   //--------------top_btn효과--------------
   
   $("#container>p").hide();
   $("#container>p").click(function(){
      $("html,body").animate({ scrollTop:0});
   });

});