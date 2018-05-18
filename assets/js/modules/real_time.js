//图片加载
window.start = false;
window.imgLoading=false;
function loadImg(index) {
    if (!document.getElementById('ctx')) {
        return;
    }
    var ctx = document.getElementById('ctx').getContext('2d');
    var img = new Image();
    var str = index.toString().padStart(12, '0');
    var url = 'http://localhost:3000/assets/output/img/' + str + '_rendered.png';
    img.src = url;
    // console.log(url)
    // var wid = document.getElementById('pic-v').offsetWidth;
    // console.log(wid)
    // var hei = document.getElementById('pic-v').offsetHeight;
    img.onload = () => {
        // console.log('render')
        if (document.getElementById('ctx') && start) {
            document.getElementById('ctx').width = 640;
            document.getElementById('ctx').height = 360;
            ctx.drawImage(img, 0, 0, 640, 360);
            setTimeout(function () {
                loadImg(index + 1)
            }, 200)
        } else {
            return;
        }

    }
    try {

        img.onerror = function (err) {
            setTimeout(function () {
                loadImg(index)
            }, 500)
            throw err
        }
    } catch (err) {

    }
    img.onerror = () => {
        return;
    }
}
function drawImg(url) { 
    if (!document.getElementById('ctx')) {
        return;
    }
    imgLoading=true;
    var ctx = document.getElementById('ctx').getContext('2d');
    var img = new Image();
    // var str = index.toString().padStart(12, '0');
 
        

        img.onload = () => {
            console.log('render')
            setTimeout(function(){
                imgLoading=false;
                ctx.drawImage(img, 0, 0, 640, 360);
            },300);
            img.onload=null;
            console.log('imgLoading false')
        }

    

    img.src = url;
    // console.log(url)
    // var wid = document.getElementById('pic-v').offsetWidth;
    // console.log(wid)
    // var hei = document.getElementById('pic-v').offsetHeight;
   
    try {

        img.onerror = function (err) {
            // setTimeout(function () {
            //     loadImg(index)
            // }, 500)
            throw err
        }
    } catch (err) {

    }
 }
// loadImg(0);

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    return !!navigator.getUserMedia;
}
//摄像头获取
var stream = null;
function startCamera() {
    var vid = document.getElementById('cam');
    if (hasUserMedia()) {
        navigator.getUserMedia({
                video: true,
                // audio: true
            },
            (vstream) => {
                vid.src = window.URL.createObjectURL(vstream);
                stream = vstream;
            },
            (err) => {
                console.log(err);
            })
    } else {
        alert("没有userMedia API")
    }
    // var vid = document.getElementById('cam');
    // vid.crossOrigin = "Anonymous";
    // // vid.src = 'http://127.0.0.1:8080/?action=stream';
    // vid.src = 'http://192.168.1.106:8080/?action=stream';
}

function stopCam() {
    // var vid = document.getElementById('cam');
    stream.getTracks()[0].stop()
    // vid.src = '';
}

function depict() {
    var v = document.getElementById('cam');
    var c = document.getElementById('pic-canvas').getContext('2d');
    var wid = document.getElementById('cam').offsetWidth;
    var heit = document.getElementById('cam').offsetHeight;

    document.getElementById('pic-canvas').width = 640;
    document.getElementById('pic-canvas').height = 640 * heit / wid;
    c.drawImage(v, 0, 0, 640, 640 * heit / wid);
    // console.log(document.getElementById('pic-canvas').toDataURL())
}

/**
 * 实时页面绑定
 */
function bindRealTime() {
    window.radio = 'l'
    document.getElementById('start').onclick = function () {
        start = true;
        handleStart();
        // startF();
    }
    document.getElementById('off').onclick = function () {
        start = false;
        handleStart();
        // off();
    }
    //精度调节
    var $radios = $('[name="options"]');
    $radios.on('change', function () {
        console.log('单选框当前选中的是：', $radios.filter(':checked').val());
        radio = $radios.filter(':checked').val();
    });

    //调用摄像头保存图片的modal框
    $('#doc-modal-list').find('.am-icon-close').add('#awaken_modal').
        on('click', function () {
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    // var $link = $(this.relatedTarget).prev('a');
                    // var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
                    //     '确定了，但不知道要整哪样';

                    // var msg = "保存成功";
                    //关闭摄像头

                    sendPic();

                    // alert(msg);
                },
                closeOnConfirm: false,
                onCancel: function () {
                    stopCam();
                    // stream.getTracks()[0].stop()
                    // stream.getTracks()[1].stop()
                    // alert('确认取消');
                }
            });
            $('.am-dimmer').css('display', 'none')
            startCamera();
        });
}

function off() {
    document.getElementById('start').style.display = 'inline-block';
    document.getElementById('off').style.display = 'none';


    client.close();
}


function startF() {


    document.getElementById('start').style.display = 'none'
    document.getElementById('off').style.display = 'inline-block'

    /**图片
     * loadImg()方法有问题，无法在图片获取失败之后继续，
     * 所以需要
     * 通过socket发送图片链接url
     * drawImg(url)
     * 
    */

    // loadImg(0);

    /**
     * socket
     */
    chartObj.chart0 = {
        data0: [],
        data1: [],
        data2: [],
        date: []
    };
    window.client = io();
    client.on('message', function (msg) {
        // var json = JSON.parse(msg.data);
        console.log(msg);
        chartObj.chart0.data0.push(msg.people[0].pose_keypoints_2d[0]);
        chartObj.chart0.data1.push(msg.people[0].pose_keypoints_2d[1]);
        chartObj.chart0.data2.push(msg.people[0].pose_keypoints_2d[3]);
        chartObj.chart0.date.push(new Date(msg.date).toLocaleTimeString());
        var temp = chartObj.chart0;
        chartObj.chart0 = temp;

        //json中需要一个字段指定图片url,绘制图片
        var path =msg.imgUrl;
        var str = './assets/output/img/'+path;
        console.log(str);
        if(imgLoading==false){
            drawImg(str);
        }
        




    });

    client.on('keyImg', function (msg) {
        //table 数据,图片url放在data-pic中
        // console.log(msg)

        var path = msg.substr(msg.indexOf('keyImg') + 7);
        var str = path.split('_');
        var model = $('tbody').html();
        model += `<tr class="err_info" data-pic="http://localhost:3000/assets/output/keyImg/${path}" onclick="">
        <td>${str[0]} </td>
        <td>${str[1]} </td>
        <td>${str[2].substr(0, str[2].lastIndexOf('.'))}</td>
            </tr>`
        $('tbody').html(model);

    })



    $('#doc-modal-list').find('.am-icon-close').add('#err_content').
        on('click', function (e) {
            // console.log(e.target.parentElement.dataset.pic)
            document.getElementsByClassName('am-img-responsive')[0].src = e.target.parentElement.dataset.pic;
            if ($(e.target).parents(".err_info").hasClass("err_info")) {

                $('#err_modal').modal({
                    relatedTarget: this,
                    // onConfirm: function (options) {
                    //     var msg = "保存成功";
                    //     alert(msg);
                    // },
                    // // closeOnConfirm: false,
                    // onCancel: function () {
                    //     // alert('确认取消');
                    // }

                });
                $('.am-dimmer').css('display', 'none')
            }

        });

    //


}




function sendPic() {
    var imgData = document.getElementById('pic-canvas').toDataURL();


    var username = document.getElementById('doc-ipt-0').value;
    var age = document.getElementById('doc-ipt-1').value;
    var gender = document.getElementById('doc-select-1').value;

    if (username.trim() == "" || username.trim() == "") {
        // alert('请补全信息');

        new Toast().showMsg('请补全信息', 1500)
        console.log('请补全信息')
        return;
    }
    console.log({ imgData, username, age, gender });
    $.ajax({
        url: '/saveInfo',
        type: 'POST',
        data: { imgData, username, age, gender },
        dataType: "JSON",
        success: function (data, state) {
            // alert('保存成功')

            if (data.state == 'ok') {
                new Toast().showMsg('保存成功', 1500)
                $('#my-confirm').modal('toggle');
                stopCam();
                // stream.getTracks()[0].stop()
                // stream.getTracks()[1].stop()
            } else {
                new Toast().showMsg('服务器错误', 1500)
            }
            console.log(data, state)
        },
        error: function (data, state) {
            new Toast().showMsg('网络异常', 1500)
            console.log(data, state)
        }
    })
}



function handleStart() {
    var send = {
        start,//true OR false
        rate: radio //l m h
    }
    console.log(send)
    $.ajax({
        url: '/cmd',
        type: 'POST',
        data: send,
        dataType: "JSON",
        success: function (data, state) {
            // alert('保存成功')

            if (data.state == 'start') {
                imgLoading=false;
                new Toast().showMsg('启动成功', 1500)
                startF()
                // stream.getTracks()[1].stop()
            } else if (data.state == 'off') {
                imgLoading=false;
                new Toast().showMsg('关闭成功', 1500)
                off();
            } else {
                new Toast().showMsg('服务器错误', 1500)
            }
            console.log(data, state)
        },
        error: function (data, state) {
            new Toast().showMsg('网络异常', 1500)
            console.log(data, state)
        }
    })
}