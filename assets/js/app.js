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
        // console.log(i);
        if(i==1||i==2){

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
function exit() { 
  $.removeCookie('username');
  document.getElementById('nav-bar').children[0].children[0].click();
}

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
        // if(nextIndex!=6){
          $dom.html(eval('dom'+nextIndex.toString())+appendix);
          buildFullpage(nextIndex);
        // }
        
        
       


                


        
        if(pageIndex==0){

          function videoPlay() {
            $('#video1').each(function (i, e) {
              $('#video1').get(i).play();
            });
          }
          videoPlay();
          $('header').css('display','none');
          $('#doc-modal-list').find('.am-icon-close').add('#know-btn').
                on('click', function (e) {
                  if(!$.cookie('username')){
                    $('#log-modal').modal({
                      relatedTarget: this,
                      onConfirm: function (options) {
                          var send={
                            username:document.getElementById('username').value,
                            password:document.getElementById('pw').value
                          }
                          if(send.username.trim()==''||send.password.trim()==''){
                            new Toast().showMsg('请补全输入框',1500);
                            return;
                          }

                          // document.getElementById('nav-bar').children[0].children[3].click();
                          $.ajax({
                            url: '/sign_in',
                            type: 'POST',
                            data: send,
                            dataType: "JSON",
                            success: function (data, state) {
                                if(data.status==200){
                                  new Toast().showMsg('登录成功', 1500);
                                  document.getElementById('user').innerHTML='hi,'+$.cookie('username')+'  <span class="am-icon-caret-down">'
                                  document.getElementById('nav-bar').children[0].children[3].click();
                                  // $('#log-modal').modal('toggle');
                                  
                                }
                            },
                            error: function (data, state) {
                                new Toast().showMsg('网络异常', 1500)
                                console.log(data, state)
                            }
                        })
                      },
                      closeOnConfirm: false,
                      closeOnCancel:false,
                      onCancel: function () {
                        var send={
                          username:document.getElementById('username').value,
                          password:document.getElementById('pw').value
                        }
                        if(send.username.trim()==''||send.password.trim()==''){
                          new Toast().showMsg('请补全输入框',1500);
                          return;
                        }
                        
                        $.ajax({
                          url: '/sign_up',
                          type: 'POST',
                          data: send,
                          dataType: "JSON",
                          success: function (data, state) {
                              if(data.status==200){
                                new Toast().showMsg('注册成功', 1500);
                                document.getElementById('nav-bar').children[0].children[3].click();
                              }else if(data.status==300){
                                new Toast().showMsg('用户名已被注册', 1500);
                              }
                          },
                          error: function (data, state) {
                              new Toast().showMsg('网络异常', 1500)
                              console.log(data, state)
                          }
                      })
                      }

                  });
                  $('.am-dimmer').css('display', 'none')
                  }else{
                    document.getElementById('nav-bar').children[0].children[3].click();
                    document.getElementById('user').innerHTML='hi,'+$.cookie('username')+'  <span class="am-icon-caret-down">'
                                  
                  }
                });
          // $('#know-btn').click(function(){
            
          //   // document.getElementById('nav-bar').children[0].children[3].click();
          // })

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
          
          
          if(pageIndex===6){//实时更新
            $('header').css('display','block');
            // $('#dowebok').load('test.html');
            bindRealTime();
          }else{
            try {
              window.client.close();
              if(start ==true){
                start=false;
                handleStart();
              }
              
              
            } catch (error) {
              console.log('socket not open')
            }
            
          }
        }





}


$(function(){
  //注册全屏幕滑动

  buildFullpage();

  
    switchPages(1,0);
 
  
  $('#setting').on('click', function (e) {

    $('#setting-modal').modal({
      relatedTarget: this,
      onConfirm: function (options) {

          var send={
            username:document.getElementById('newusername').value.trim()==''?$.cookie('username'):document.getElementById('newusername').value,
            password:document.getElementById('newpw').value
          }
          if(send.password.trim()==''){
            new Toast().showMsg('请补全输入框',1500);
            return;
          }
          if(send.password!=document.getElementById('newpw1').value){
            new Toast().showMsg('两次密码有误',1500);
            return;
          }

          // document.getElementById('nav-bar').children[0].children[3].click();
          $.ajax({
            url: '/change',
            type: 'POST',
            data: send,
            dataType: "JSON",
            success: function (data, state) {
                if(data.status==200){
                  new Toast().showMsg('修改成功', 1500);
                  document.getElementById('user').innerHTML='hi,'+$.cookie('username')+'  <span class="am-icon-caret-down">'
                                  
                  $('#setting-modal').modal('toggle');
                  
                }else{
                  new Toast().showMsg('修改失败', 1500);
                }
            },
            error: function (data, state) {
                new Toast().showMsg('网络异常', 1500)
                console.log(data, state)
            }
        })
      },
      closeOnConfirm: false,
      closeOnCancel:false,
      onCancel: function () {
        var send={
          username:document.getElementById('username').value,
          password:document.getElementById('pw').value
        }
        if(send.username.trim()==''||send.password.trim()==''){
          new Toast().showMsg('请补全输入框',1500);
          return;
        }
        
        $.ajax({
          url: '/sign_up',
          type: 'POST',
          data: send,
          dataType: "JSON",
          success: function (data, state) {
              if(data.status==200){
                new Toast().showMsg('注册成功', 1500);
                document.getElementById('nav-bar').children[0].children[3].click();
              }else if(data.status==300){
                new Toast().showMsg('用户名已被注册', 1500);
              }
          },
          error: function (data, state) {
              new Toast().showMsg('网络异常', 1500)
              console.log(data, state)
          }
      })
      }

  });
  $('.am-dimmer').css('display', 'none')

});
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

function buildFullpage(ind) {
  window.score1=null;
  //注册打分工具
  if(ind!=6){
    $('.starrr').starrr({
      change: function(e, value){
        console.log('111')
        window.score1=value;
      }
    })
  }
 
  
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

