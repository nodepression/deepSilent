



function loadImg(index) {
    if(!document.getElementById('ctx')){
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
        if(document.getElementById('ctx')){
            ctx.drawImage(img, 0, 0, wid, hei);
            setTimeout(function () {
                loadImg(index + 1)
            }, 200)
        }else{
            return ;
        }
        
    }
    img.onerror = () => {
        return;
    }
}

// loadImg(0);






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