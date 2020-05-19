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

$(document).on("click", ".site-delete", function() {
    var cred = $(this).attr("data-site")
    var url = "/user/delete-site/" + cred
    if(confirm("Deleting site will delete all the crdentials in this site. Are you sure you want to delete?")) {
        overlay.style.display = "block" 
        axios.delete(url)
        .then((response) => {
            overlay.style.display = "none"
            if(response.status == 200) {
                alert("Site has been deleted")
                window.location.reload()
            } else {
                alert("Error occured")
            }
        })
        .catch((error) => {
            overlay.style.display = "none"
            alert("Error occured")
            console.log(error.response)
        })
    }
})

$(document).on("click", "#edit-cred-button", function() {
    var mpin = prompt("Please enter your mpin to edit the credentials")
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
                    $("#edit-cred-form").attr("action", "/user/credentials/edit/" + response.data.id)
                    $("#ed-username").val(response.data.username)
                    $("#ed-email").val(response.data.email)
                    $("#ed-mobile").val(response.data.mobile)
                    $("#ed_addinfo").val(response.data.addinfo)
                    UIkit.modal("#edit-cred-modal").show()
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

$(document).on("click", "#delete-cred-button", function() {
    var cred = $(this).attr("data-cred")
    if(confirm("Are you sure you want to delete?")) {
        overlay.style.display = "block"
        let url = "/user/delete-cred/" + cred
        axios.delete(url)
            .then((response) => {
                if(response.status == 200) {
                    alert("Credential has been deleted successfully")
                    window.location.reload()
                } else {
                    alert("Error occured")
                }
            })
            .catch((error) => {
                alert("Error occured")
                console.log(error.response)
            })
    }
})

$(document).on("click", ".website-delete", function() {
    var site = $(this).attr("data-site")
    if(confirm("Are you sure you want to delete?")) {
        overlay.style.display = "block"
        let url = "/user/delete-website/" + site
        axios.delete(url)
            .then((response) => {
                overlay.style.display = "none"
                if(response.status == 500) {
                    alert("Error occured")
                } else {
                    alert("Website has been deleted successfully")
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert("Error occured")
            })
    }
})