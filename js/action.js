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

    $("#validationCustom02").on("input", function (event) {
        if ($("#validationCustom02").val().length > 0) {
            $("#validationCustom02").removeClass("was-invalid ");
            $("#showPassError").addClass("d-none");
        }
    });

    $("#eye-show").click(() => {
        $("#validationCustom02").attr("type", "text");
        $("#eye-show").addClass("d-none");
        $("#eye-hide").removeClass("d-none");
    });
    $("#eye-hide").click(() => {
        $("#validationCustom02").attr("type", "password");
        $("#eye-show").removeClass("d-none");
        $("#eye-hide").addClass("d-none");
    });

    let curr_track = document.createElement("audio");
    let updateTimer;
    let currentid;
    let isPlaying = false;

    $(".song-item").click((event) => {
        var parentElement = $(event.target).closest(".song-item");
        var id = parentElement.attr("idsong");
        currentid = id;
        loadTrack(id);
        $(".play-music").removeClass("d-none");
    });

    const loadTrack = (id) => {
        clearInterval(updateTimer);
        reset();
        pauseTrack();
        var item = topSongs.filter((a) => a.id === id)[0];

        curr_track.src = "../audio/" + item.audio;
        $(".image-song").attr("src", "../images/" + item.image);
        $(".name-song").html(item.title);
        $(".author-song").html(item.author);
        curr_track.load();

        updateTimer = setInterval(setUpdate, 1000);
        playTrack;
        curr_track.addEventListener("ended", nextTrack);
    };

    const reset = () => {
        $(".current-time").html("00:00");
        $(".total-duration").html("00:00");
        $(".seek_slider").val(0);
    };

    const setUpdate = () => {
        let seekPosition = 0;
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            $(".seek_slider").val(seekPosition);

            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(
                curr_track.currentTime - currentMinutes * 60
            );
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(
                curr_track.duration - durationMinutes * 60
            );

            if (currentSeconds < 10) {
                currentSeconds = "0" + currentSeconds;
            }
            if (durationSeconds < 10) {
                durationSeconds = "0" + durationSeconds;
            }
            if (currentMinutes < 10) {
                currentMinutes = "0" + currentMinutes;
            }
            if (durationMinutes < 10) {
                durationMinutes = "0" + durationMinutes;
            }
            $(".current-time").html(currentMinutes + ":" + currentSeconds);
            $(".total-duration").html(durationMinutes + ":" + durationSeconds);
        }
    };

    const seekTo = () => {
        let seekto = curr_track.duration * ($(".seek_slider").val() / 100);
        curr_track.currentTime = seekto;
    };
    $(".seek_slider").change(() => {
        seekTo();
    });

    const playTrack = () => {
        curr_track.play();
        isPlaying = true;
        $(".play-song").addClass("d-none");
        $(".pause-song").removeClass("d-none");
    };
    const pauseTrack = () => {
        curr_track.pause();
        isPlaying = false;
        $(".play-song").removeClass("d-none");
        $(".pause-song").addClass("d-none");
    };
    const playpauseTrack = () => {
        isPlaying ? pauseTrack() : playTrack();
    };
    $(".playpause-track").click(() => {
        playpauseTrack();
    });

    $(".repeat-track").click(() => {
        loadTrack(currentid);
    });

    $(".volume_slider").change(() => {
        curr_track.volume = $(".volume_slider").val() / 100;
    });
    const nextTrack = () => {
        if (currentid) {
            var nextId = topSongs.filter((item) => item.id > currentid);
            if (nextId.length > 0) {
                currentid = nextId[0].id;
            } else {
                currentid = "1";
            }
            loadTrack(currentid);
        } else {
            loadTrack("1");
            currentid = "1";
        }
    };
    $(".next-track").click(() => {
        if (currentid) {
            var nextId = topSongs.filter((item) => item.id > currentid);
            if (nextId.length > 0) {
                currentid = nextId[0].id;
            } else {
                currentid = "1";
            }
            loadTrack(currentid);
        } else {
            loadTrack("1");
            currentid = "1";
        }
    });

    $(".prev-track").click(() => {
        if (currentid) {
            var nextId = topSongs.filter((item) => item.id < currentid);
            if (nextId.length > 0) {
                currentid = nextId[nextId.length - 1].id;
            } else {
                currentid = topSongs[topSongs.length - 1].id;
            }
            loadTrack(currentid);
        } else {
            currentid = topSongs[topSongs.length - 1].id;
            loadTrack(currentid);
        }
    });

    $(".random-track").click(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: "success",
            title: "Add to favorite  successfully",
        });
    });
    albums.map((item) => {
        $(".album")
            .append(` <div id="${item.id}" class="col-3 pointer song-album">
        <div class="card h-70" style="background-color: black !important; border: none;">
            <img src="../images/${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-light">${item.title}</h5>
                <p class="card-text" style="color: gray;">${item.sub_title}</p>
            </div>
        </div>
    </div>`);
    });

    $(".song-album").click((event) => {
        var parentElement = $(event.target).closest(".song-album");
        var id = parentElement.attr("id");
        alert(id);
    });
});
import { topSongs } from "../js/data.js";
import { albums } from "../js/data.js";
document.addEventListener("DOMContentLoaded", function () {
    var ulElement = document.getElementById("top-songs-list");
    topSongs.forEach((item) => {
        var liElement = document.createElement("li");
        var aElement = document.createElement("div");
        var imgElement = document.createElement("img");
        var spanSong = document.createElement("span");
        aElement.setAttribute("idsong", item.id);
        aElement.classList.add("song-item");
        imgElement.src = "../images/" + item.image;
        imgElement.alt = "";
        imgElement.width = 40;
        spanSong.textContent = item.author + " - " + item.title;
        aElement.appendChild(imgElement);
        aElement.appendChild(spanSong);

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });
});
