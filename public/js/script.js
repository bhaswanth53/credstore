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


/* Validation for Auth Pages */
/* $("#register-form").validate({
    rules: {
        name: {
            required: true,
            maxlength: 191
        },
        email: {
            required: true,
            email: true,
            maxlength: 191
        },
        password: {
            required: true,
            minlength: 8,
            maxlength: 32
        },
        cpassword: {
            required: true,
            equalTo: "#password"
        }
    },
    messages: {
        name: {
            required: "Name is required",
            maxlength: "Name must not exceeded more than 191 characters"
        },
        email: {
            required: "Email is required",
            email: "Email is invalid",
            maxlength: "Email is not longer than 191 characters"
        },
        password: {
            required: "Password is required",
            minlength: "Password required min 8 characters",
            maxlength: "Password is no longer than 32 characters"
        },
        cpassword: {
            required: "Please confirm the password",
            equalTo: "Passwords are not matching"
        }
    },
    submitHandler: function(form) {
        form.submit()
    }
}) */