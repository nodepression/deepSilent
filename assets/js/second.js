
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



function getAll(){
    $('#down_button1')[0].click();
    $('#down_button2')[0].click();
    $('#down_button3')[0].click();
}


function getScreen2(){
    var canvas = $("canvas");

    canvas.map(function(index,item){
        var dom = "#down_button" + index;
        $(dom).attr('href',item.toDataURL());
        $(dom).attr('download', index);
        if(index==0){
            $(dom).attr('click',  getAll);
        }
        var html_canvas = item.toDataURL();
    });


    html2canvas($("#_table"), {
        onrendered: function (canvas) {
            $('#down_button3').attr('href', canvas.toDataURL());
            $('#down_button3').attr('download', '表格');
            var html_canvas = canvas.toDataURL();
        }
    });


    $('#down_button0')[0].onclick = function(){
        getAll();
    }

}
