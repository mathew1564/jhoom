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
document.addEventListener('DOMContentLoaded', function() {
    var ulElement = document.getElementById('top-songs-list');

    // Mảng các tên nghệ sĩ và bài hát
    var artists = ['Vision', 'Aria', 'Echo', 'Lyric', 'Melody'];
    var songs = ['Bella', 'Harmony', 'Serenade', 'Rhythm', 'Chorus'];
    let n =5
    for (var i = 1; i <= n; i++) {
        var liElement = document.createElement('li');
        var aElement = document.createElement('a');
        var spanNumber = document.createElement('span');
        var imgElement = document.createElement('img');
        var spanSong = document.createElement('span');

        // Lấy ngẫu nhiên tên nghệ sĩ và bài hát từ mảng
        var randomArtist = artists[Math.floor(Math.random() * artists.length)];
        var randomSong = songs[Math.floor(Math.random() * songs.length)];

        spanNumber.textContent = i + '.';
        imgElement.src = '../images/artists.png';
        imgElement.alt = '';
        imgElement.width = 40;
        spanSong.textContent = randomArtist + ' - ' + randomSong;

        aElement.appendChild(spanNumber);
        aElement.appendChild(imgElement);
        aElement.appendChild(spanSong);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }
});
