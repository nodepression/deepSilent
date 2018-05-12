

function loadImg(index) {
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