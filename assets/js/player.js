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
                $('#startTest').click(function(){
                    initchart();
                })
                
                $("#player").css({ "width": "100%", "height": "100%" }).attr('controls',"controls");
            }
        }



    });
}


function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    return !!navigator.getUserMedia;
}


function bindPage4() {
    $('#camera-btn').click(function () {
        startCamera();
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

                $("#player")[0].src = url;

                $("#player")[0].onload = function () {

                    window.URL.revokeObjectURL(src);

                };
                $('#startTest').click(function(){
                    $('#p-video').attr('src','assets/video/test.mp4');

                })
                
                $("#player").css({ "width": "100%", "height": "100%" }).attr('controls',"controls");
            }
        }



    });
}



