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
            console.log(file.target.files[0].name);
            var fileName = file.target.files[0].name;
            var attr = fileName.substr(fileName.indexOf('.')+1);
            if(attr.toLowerCase() !==('mp4'||'avi'||'rmvb'||'3gp'||'mkv'||'wmv'||'vob'||'flv'||'swf'||'mov'||'mpg')){
                alert('格式不支持')
            }else{
                var url = window.URL.createObjectURL(file.target.files[0]);

                $("#player")[0].src = url;

                $("#player")[0].onload = function () {

                    window.URL.revokeObjectURL(src);

                };

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
