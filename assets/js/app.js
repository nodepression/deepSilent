(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });







    window.pageIndex=0;

    var bar = document.getElementById('nav-bar').children[0].children;
    for(var i =0;i<bar.length;i++){

      bar[i].addEventListener('click',(function(i){
        console.log(i);
        if(i==1||i==2||i==6){

        }else{
          
            return ()=>switchPages(window.pageIndex,i)
          
        }
        
      })(i));

    }


  });





  

  $.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };

        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));

      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);

        if (typeof callback === 'function') callback();
      });

      return this;
    },
  });

})(jQuery);


/***
 * **
 * 点击导航栏
 * 注册事件
 * 事件
 * 用的
 *
 * *********************/


function switchPages(lastIndex,nextIndex) {
  // console.log(lastIndex,nextIndex)
  if(lastIndex===nextIndex){

  }else{
        var $dom = $('#zone0');

        var nav = document.getElementById('nav-bar').children[0];
        var lastbar =nav.children[lastIndex];
        var nextbar =nav.children[nextIndex];
        lastbar.className='';
        nextbar.className='active';
        window.pageIndex=nextIndex;

        $dom.animateCss('bounceInUp');
        $('#dowebok').fullpage.destroy('all');
        $dom.html(eval('dom'+nextIndex.toString()));


        buildFullpage();
        if(pageIndex==0){

          function videoPlay() {
            $('#video1').each(function (i, e) {
              $('#video1').get(i).play();
            });
          }
          videoPlay();
          $('header').css('display','none');
          $('#know-btn').click(function(){
            document.getElementById('nav-bar').children[0].children[3].click();
          })

          }else if(pageIndex===5){
            $('header').css('display','block');
            bindPage6();
            init4Chart();

          }else if(pageIndex===3){
            $('header').css('display','block');
            bindPage3();
          }else if(pageIndex===4){
            $('header').css('display','block');
            bindPage4();
            bindPage5();

            $('.speed').click(function(){
              setSpeed();
            })
  
          }
        }





}


$(function(){
  //注册全屏幕滑动

  buildFullpage();
  function videoPlay() {
    $('#video1').each(function (i, e) {
      $('#video1').get(i).play();
    });
  }
  videoPlay();
  $('#know-btn').click(function(){
    document.getElementById('nav-bar').children[0].children[3].click();
  })
  
});





/***
 * **
 * 下面这个方法
 * 是用来
 * 绑定
 * 动画用的
 * 动画
 * 动画
 *
 * *********************/

function buildFullpage() {
  window.score1=null;
  //注册打分工具
  $('.starrr').starrr({
    change: function(e, value){
      console.log('111')
      window.score1=value;
    }
  })
  
  //注册page
  $('#dowebok').fullpage({
    sectionsColor: ['#f8fdfd', '#f8fdfd', '#f8fdfd', '#f8fdfd'],
    scrollOverflow:true,
    onLeave:function (index,nextIndex,direction) {

      if(pageIndex==1){
      //nextIndex从1开始计算
        if(nextIndex==1){

          $('.side-title').animateCss('bounceInLeft');
          $('.content-title').animateCss('bounceInUp');
          $('#word1').animateCss('bounceInUp');
        }else if(nextIndex==2){
          $('.side-title').animateCss('bounceInLeft');
          $('.btn-box').animateCss('bounceInUp');


        }else if(nextIndex===3){
          $('.side-title').animateCss('bounceInLeft');
          $('.am-u-sm-3').animateCss('bounceInLeft');
          $('.am-u-sm-1').animateCss('bounceInLeft');
          $('.am-u-sm-4').animateCss('bounceInRight');


        }
      }else{



        if(nextIndex==2){
          var $pic_left = $('#pic3-left');
          var $pic_right = $('#pic2-right');
          var $word = $('#word2');

          $pic_left.animateCss('bounceInLeft');
          $pic_right.animateCss('bounceInRight');
          $word.animateCss('bounceInRight');


        }else if(nextIndex==3){
          var $left = $('#pic3-left');
          var $right = $('#word2');
          $left.animateCss('bounceInLeft')
          $right.animateCss('bounceInRight')
        }

      }


    }
  });
}

