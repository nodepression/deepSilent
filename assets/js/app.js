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

        return ()=>switchPages(window.pageIndex,i)


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




function switchPages(lastIndex,nextIndex) {
  console.log(lastIndex,nextIndex)
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
  }





}


$(function(){
  //注册全屏幕滑动

  buildFullpage();


});

function buildFullpage() {

  $('#dowebok').fullpage({
    sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
    onLeave:function (index,nextIndex,direction) {

      if(pageIndex==0){
        $(function () {
          function videoPlay() {
            $('video').each(function (i, e) {
              $('video').get(i).play();
            });
          }
          videoPlay();
        });

      }else if(pageIndex==1){
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

        //注册打分工具
        $('.starrr').starrr({
          change: function(e, value){
            alert('new rating is ' + value)
          }
        })


        if(nextIndex==2){
          var $pic_left = $('#pic1-left');
          var $pic_right = $('#pic2-right');
          var $word = $('#word1');

          $pic_left.animateCss('bounceInLeft');
          $pic_right.animateCss('bounceInRight');
          $word.animateCss('bounceInUp');


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

