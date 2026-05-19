const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.display = "block";
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});
document.addEventListener("mouseleave", (e) => {
    cursor.style.display = "none";
});