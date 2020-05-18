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
    if(confirm("All the content inside this category will marked as Uncategorized. Are you sure you want to delete this category?")) {
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

$(document).on('click', '.info-button', function() {
    var mpin = prompt("Please enter your mpin to view the credentials")
    var cred = $(this).attr("data-cred")
    if(mpin == "") alert("Please enter your mpin")
    else {
        // UIkit.modal("#view-cred-modal").show()
        overlay.style.display = "block"
        let info = {
            mpin,
            cred
        }
        axios.post("/user/get-credential", info)
            .then((response) => {
                overlay.style.display = "none"
                if(response.status == 200) {
                    $("#cred-username").text(response.data.username)
                    $("#cred-email").text(response.data.email)
                    $("#cred-mobile").text(response.data.mobile)
                    $("#cred-password").text(response.data.password)
                    $("#cred-add").text(response.data.addinfo)
                    UIkit.modal("#view-cred-modal").show()
                } else if(response.status == 205) {
                    alert("MPIN is not correct")
                } else if(response.status == 206) {
                    alert("User not found")
                }
            })
            .catch((error) => {
                overlay.style.display = "none"
                console.log(error.response)
            })
    }
})