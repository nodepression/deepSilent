
function setSpeed() {
    var con = $('.speed');
    con.map(function (index, item) {
        if (item.checked) {
            console.log(item.value);
            $("#testVideo")[0].playbackRate = item.value + 0;
        }
    });
}


function getScreen(){
            var canvas = $("canvas")[0];
            $('#down_button').attr('href', canvas.toDataURL());
            $('#down_button').attr('download', 'score.png');
            var html_canvas = canvas.toDataURL();
}