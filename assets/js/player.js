/**
 * Created by weng on 2018/3/4.
 */
function bindPage3() {
    $("#video-btn").click(function () {
        $("#videoFile").click();

    })
    initchart();
    var fileName='demo.mp4';
    $("#videoFile").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            fileName = file.target.files[0].name;
            var attr = fileName.substr(fileName.indexOf('.')+1).toLowerCase();
            console.log(attr);
            if(attr !='mp4'&&attr !='avi'&&attr !='rmvb'&&attr !='3gp'&&attr !='mkv'&&attr !='wmv'&&attr !='vob'&&attr !='flv'&&attr !='swf'&&attr !='mov'&&attr !='mpg'){
                alert('格式不支持')
            }else{
                var url = window.URL.createObjectURL(file.target.files[0]);

                $("#player")[0].src = url;

                $("#player")[0].onload = function () {

                    window.URL.revokeObjectURL(src);

                };
                
                
                $("#player").attr('controls',"controls");
            }
        }
    });
    $('#startTest').click(function(){
        new Toast().showMsg('请稍等...',2000);
        setTimeout(function(){getScreen(0,"得分")},3000);
        setTimeout(function(){initchart(fileName,[0.02, 0.12, 0.05, 0.8, 0.01])},2000);
    })

    $('#score-btn').click(function(){
        if(window.score1===null){

        }else{
            alert('您的打分是：'+window.score1)
        }
        
    })

}


function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    return !!navigator.getUserMedia;
}

//bind 摄像头事件
function bindPage4() {
    $('#camera-btn').click(function () {
        startCamera();
    })

    $('#score-btn').click(function(){
        if(window.score1===null){

        }else{
            alert('您的打分是：'+window.score1)
        }
        
    })
}
function startCamera() {
    var yourVideo = document.getElementById('camera');
    if (hasUserMedia()) {
        navigator.getUserMedia({ video: true, audio: true },
            (stream) => {
                yourVideo.src = window.URL.createObjectURL(stream);

            },
            (err) => {
                console.log(err);
            })
    } else {
        alert("没有userMedia API")
    }
}




//bind 视频事件
//姿态标记页面
function bindPage5(){
    $("#video-btn").click(function () {
        $("#videoFile").click();

    })
    var fileName='demo.mp4';
    $("#videoFile").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            fileName = file.target.files[0].name;
            var attr = fileName.substr(fileName.indexOf('.')+1).toLowerCase();
            console.log(attr);
            if(attr !='mp4'&&attr !='avi'&&attr !='rmvb'&&attr !='3gp'&&attr !='mkv'&&attr !='wmv'&&attr !='vob'&&attr !='flv'&&attr !='swf'&&attr !='mov'&&attr !='mpg'){
                alert('格式不支持')
            }else{
                var url = window.URL.createObjectURL(file.target.files[0]);

                $("#player1")[0].src = url;

                $("#player1")[0].onload = function () {

                    window.URL.revokeObjectURL(src);

                };
                
                $("#player1").attr('controls',"controls");
                
            }
        }

    });
    $('#startTest').click(function(){
        new Toast().showMsg('请稍等...',2000);
        console.log(fileName);
        var path;
        switch(fileName){
            case 'demo1.mp4':
                path='assets/video/demo/demo1.mp4';
                break;
            case 'demo2.mp4':
                path='assets/video/demo/demo2.mp4';
                break;
            case 'demo3.mp4':
                path='assets/video/demo/demo3.mp4';
                break;
            default:
                alert('请选择其他视频')
                break;
        }
        setTimeout(function(){
            $('#processed-video').attr('src',path);
            synVideo();
        },2000)
        

    })
}

function synVideo(){
    var processv = document.getElementById('processed-video');
    var v1 = document.getElementById('player1');
    // var p_current=0;
    processv.addEventListener('loadedmetadata',function(){
         v1.addEventListener('pause',function(){
            //  console.log('pouse')
             processv.pause();
         })
         v1.addEventListener('play',function(){
            //  console.log('start')
             processv.currentTime=v1.currentTime;
             processv.play();
         })
    })
    if(v1.currentTime!=0){
        processv.currentTime=v1.currentTime;
        processv.play();
    }
       
}


function bindPage6(){
    /***
 * **
 * 视频
 * 绑定
 * 
 */
    $('#chose-btn').click(function () {
        $('#chose-btn').dropdown('toggle')
      })
    $("#upvideo").click(function () {
        $("#videoFile0").click();
    })
    $("#videoFile0").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            var fileName = file.target.files[0].name;
            var attr = fileName.substr(fileName.indexOf('.')+1).toLowerCase();
            console.log(attr);
            if(attr !='mp4'&&attr !='avi'&&attr !='rmvb'&&attr !='3gp'&&attr !='mkv'&&attr !='wmv'&&attr !='vob'&&attr !='flv'&&attr !='swf'&&attr !='mov'&&attr !='mpg'){
                alert('格式不支持')
            }else{
                document.getElementById('dropList').innerHTML+=`<li><a href="javascript:bindeAnalyse('${fileName}')">${fileName}</a></li>`;
                console.log(document.getElementById('dropList').innerHTML)
            }
        }
    });
}



/**
 * 实时页面绑定
*/
function bindRealTime(){
    /**图片*/
    loadImg(0);

    /**
     * socket
     */
    chartObj.chart0={
        data0:[],
        data1:[],
      date:[new Date().toLocaleTimeString()]
  };
    var client = io();
            client.on('message', function (msg) {
                // var json = JSON.parse(msg.data);
                // console.log(msg);
                chartObj.chart0.data0.push(msg.people[0].pose_keypoints_2d[0]);
                chartObj.chart0.data1.push(msg.people[0].pose_keypoints_2d[1]);
                chartObj.chart0.date.push(new Date(msg.date).toLocaleTimeString());
                var temp = chartObj.chart0;
                chartObj.chart0=temp;
            });
}