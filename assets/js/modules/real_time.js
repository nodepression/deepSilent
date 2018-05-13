//图片加载
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
    var wid = document.getElementById('pic-v').offsetWidth;
    // console.log(wid)
    var hei = wid / 2;
    img.onload = () => {
        // console.log('render')
        if (document.getElementById('ctx')) {
            ctx.drawImage(img, 0, 0, wid, hei);
            setTimeout(function () {
                loadImg(index + 1)
            }, 200)
        } else {
            return;
        }

    }
    img.onerror = () => {
        return;
    }
}

// loadImg(0);

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    return !!navigator.getUserMedia;
}
//摄像头获取
function startCamera() {
    var vid = document.getElementById('cam');
    if (hasUserMedia()) {
        navigator.getUserMedia({
                video: true,
                audio: true
            },
            (stream) => {
                vid.src = window.URL.createObjectURL(stream);

            },
            (err) => {
                console.log(err);
            })
    } else {
        alert("没有userMedia API")
    }
}

function depict() {
    var v = document.getElementById('cam');
    var c = document.getElementById('pic-canvas').getContext('2d');
    c.drawImage(v, 0, 0, 300, 150)
}




/**
 * 实时页面绑定
 */
function bindRealTime() {
    /**图片*/
    loadImg(0);

    /**
     * socket
     */
    chartObj.chart0 = {
        data0: [],
        data1: [],
        date: [new Date().toLocaleTimeString()]
    };
     window.client = io();
    client.on('message', function (msg) {
        // var json = JSON.parse(msg.data);
        // console.log(msg);
        chartObj.chart0.data0.push(msg.people[0].pose_keypoints_2d[0]);
        chartObj.chart0.data1.push(msg.people[0].pose_keypoints_2d[1]);
        chartObj.chart0.date.push(new Date(msg.date).toLocaleTimeString());
        var temp = chartObj.chart0;
        chartObj.chart0 = temp;



        //table 数据
        if (msg.type == 'table') {
            var model = $('tbody').html();
            model += `<tr>
        <td>${msg.a} </td>
        <td>${msg.b} </td>
        <td>${msg.c}</td>
            </tr>`
            $('tbody').html(model);
        }
    });


    var $radios = $('[name="options"]');
    $radios.on('change', function () {
        console.log('单选框当前选中的是：', $radios.filter(':checked').val());
    });

    
    $('#doc-modal-list').find('.am-icon-close').add('#awaken_modal').
        on('click', function () {
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function (options) {
                    // var $link = $(this.relatedTarget).prev('a');
                    // var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
                    //     '确定了，但不知道要整哪样';
                    var msg = "保存成功";
                    alert(msg);
                },
                // closeOnConfirm: false,
                onCancel: function () {
                    // alert('确认取消');
                }
             });
             $('.am-dimmer').css('display','none')
    });


}