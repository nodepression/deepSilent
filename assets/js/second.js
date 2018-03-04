
function setSpeed() {
    var con = $('.speed');
    con.map(function (index, item) {
        if (item.checked) {
            console.log(item.value)
        }
    });
}
