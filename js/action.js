(() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                // form.classList.add("was-validated");
            },
            false
        );
    });
})();

$(document).ready(function () {
    $("#button-confirm-username").click(function () {
        if ($("#validationCustom01").val().length < 1) {
            $("#validationCustom01").addClass("was-invalid ");
            $("#showUserError").removeClass("d-none");
        } else {
            $("#form-username").addClass("d-none");
            $("#form-password").removeClass("d-none");
        }
    });
    $("#validationCustom01").on("input", function (event) {
        if ($("#validationCustom01").val().length > 0) {
            $("#validationCustom01").removeClass("was-invalid ");
            $("#showUserError").addClass("d-none");
        }
    });

    $("#button-confirm-password").click(function (e) {
        if ($("#validationCustom02").val().length < 1) {
            e.preventDefault();
            $("#validationCustom02").addClass("was-invalid ");
            $("#showPassError").removeClass("d-none");
        }
    });
});
