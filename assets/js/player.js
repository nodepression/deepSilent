/**
 * Created by weng on 2018/3/4.
 */
function bindPage3() {
    $("#video-btn").click(function () {
        $("#videoFile").click();

    })

    $("#videoFile").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            var fileName = file.target.files[0].name;
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
        initchart();
        setTimeout(function(){getScreen()},1000);
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
function bindPage5(){
    $("#video-btn").click(function () {
        $("#videoFile").click();

    })

    $("#videoFile").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            var fileName = file.target.files[0].name;
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
        $('#processed-video').attr('src','assets/video/test.mp4');
        synVideo()

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

