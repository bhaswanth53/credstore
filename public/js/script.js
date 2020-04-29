let overlay = document.getElementById("overlay")

window.addEventListener("load", function() {
    overlay.style.display = "none"
})

$(document).on('click', '.cat-radio label', function() {
    var ref = $(this).attr("for")
    var input = $("#"+ref)
    input.prop("checked", true)
    /* console.log(input.prop("checked"))
    if(input.prop("checked") == true) {
        alert(input.val())
    } */
})

$('.datatable').dataTable();