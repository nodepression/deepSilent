
function setSpeed() {
    var con = $('.speed');
    con.map(function (index, item) {
        if (item.checked) {
            console.log(item.value);
            $("#testVideo")[0].playbackRate = item.value + 0;
        }
    });
}


function getScreen(i,name){
            var canvas = $("canvas")[i];
            $('#down_button').attr('href', canvas.toDataURL());
            $('#down_button').attr('download', name);
            var html_canvas = canvas.toDataURL();
}

function getScreen2(){
    html2canvas($("#_table"), {
        onrendered: function (canvas) {
            $('#down_button').attr('href', canvas.toDataURL());
            $('#down_button').attr('download', '表格');
            var html_canvas = canvas.toDataURL();
        }
    });
}
