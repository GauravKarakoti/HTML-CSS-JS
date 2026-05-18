const g = document.getElementById("g");
const a1 = document.getElementById("a1");
const u = document.getElementById("u");
const r = document.getElementById("r");
const a2 = document.getElementById("a2");
const v = document.getElementById("v");
const gaurav = document.getElementById("complete");
g.addEventListener("click", () => {
    g.style.display = none;
    a1.style.display = "block";
});
a1.addEventListener("click", () => {
    a1.style.display = none;
    u.style.display = "block";
});
u.addEventListener("click", () => {
    u.style.display = none;
    r.style.display = "block";
});
r.addEventListener("click", () => {
    r.style.display = none;
    a2.style.display = "block";
});
a2.addEventListener("click", () => {
    a2.style.display = none;
    v.style.display = "block";
});
v.addEventListener("click", () => {
    v.style.display = none;
    gaurav.style.display = "block";
});
gaurav.addEventListener("click", () => {
    gaurav.style.display = none;
    v.style.display = "block";
});