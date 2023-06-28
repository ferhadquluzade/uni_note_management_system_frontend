var modal = document.querySelector(".note-modal");
var modalImg = document.querySelector(".modal-img");
var captionText = document.querySelector(".note-caption");
var images = document.querySelectorAll(".note-cover-image");
console.log(images)

images.forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;

        var closeBtn = document.querySelector(".note-modal-close");
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        })
    })
})

