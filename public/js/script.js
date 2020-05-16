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

$('.datatable').dataTable()

$("#textarea").autoResize()

var deletecategory = (id) => {
    alert("Clicked")
} 

$(document).on('click', ".delete-category", function() {
    if(confirm("Are you sure you want to delete this category?")) {
        overlay.style.display = "block"
        var id = $(this).attr("data-id")
        var url = "/user/categories/" + id
        axios.delete(url)
            .then((response) => {
                alert("Category has been deleted successfully")
                window.location.reload()
            })
    }
})