window.onload=function(){
 var music=document.getElementById("music");
 var disc=music.getElementsByTagName("img")[1];
 var audio=document.getElementsByTagName('audio')[0];
 var page1=document.getElementById("page1");	
 var page2=document.getElementById("page2");	
 var page3=document.getElementById("page3");
 var page1_icon= document.getElementsByClassName("page1_icon")[0];
 var page1_enter= document.getElementsByClassName("page1_enter")[0];
 var page1_me= document.getElementsByClassName("page1_me")[0];
 var page1_enterbox= document.getElementsByClassName("page1_enterbox")[0];
 var words1= document.getElementsByClassName("words1")[0];
 var words2= document.getElementsByClassName("words2")[0];
 var words3= document.getElementsByClassName("words3")[0];
 var bg=page2.getElementsByTagName("div")[1];
 var bg1=page3.getElementsByTagName("div")[0];
		


 /*music*/
//监听音乐结束，自动停止动画
  audio.addEventListener("ended",function(event){
  	      /*disc.setAttribute("class","");*/
  	      //有兼容性，但效果更好，适用苹果手机
         disc.style.webkitAnimationPlayState="paused";
  },false)
//监听手机触发事件，停止动画
  music.addEventListener("touchstart",function(event){
  	    if(audio.paused){
      audio.play();
     /* this.setAttribute("class","disc");*/
      //有兼容性，但效果更好，适用苹果手机
      disc.style.webkitAnimationPlayState="running";

	}else{
		 audio.pause();
		 /* this.setAttribute("class",""); */
		  //有兼容性，但效果更好，适用苹果手机
      disc.style.webkitAnimationPlayState="paused";
	}
  },false);

  /*第一页动画*/

   window.setTimeout(function(){
      page1_me.style.display="block";
   },1000);
   window.setTimeout(function(){
      page1_icon.style.display="block";
   },4000);
   window.setTimeout(function(){
       page1_enter.style.display="block";
       page1_enterbox.style.display="block";
   },7000);

   page1_enter.addEventListener("touchstart",function(event){
         
         page1_enter.setAttribute("class","page1_enter page1_rotate");
        page1_enterbox.setAttribute("class","page1_enterbox page1_rotate1");
         page1.style.display="none";
          page2.style.display="block";
          page3.style.display="block";
          page3.style.top="100%";
          bg.setAttribute("class","bg fadeout");
           
          window.setTimeout(function(){
           words1.style.display="block";
            },10000);  
          window.setTimeout(function(){
           words2.style.display="block";
            },13000);
           window.setTimeout(function(){
            words3.style.display="block";
            },15000);
             window.setTimeout(function(){
            words3.style.display="block";
           words2.style.display="block";
           words1.style.display="block";
            page2.setAttribute("class","page fadeout");
             page3.setAttribute("class","page fadein");
             bg1.style.display="block";
            },17000);

   },false);


  /*第二页动画*/


  // 第二页效果 字一个字一个字上去，像敲上去的一样
  // 没有一颗心会因为追求梦想而受伤，当你真心想要某样东西时，整个宇宙都会联合起来帮你完成。
}