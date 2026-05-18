const g = document.getElementById("g");
const a1 = document.getElementById("a1");
const u = document.getElementById("u");
const r = document.getElementById("r");
const a2 = document.getElementById("a2");
const v = document.getElementById("v");
const gaurav = document.getElementById("complete");

g.classList.add("animate-in");

function triggerTransition(currentEl, nextEl) {
    currentEl.style.display = "none";
    nextEl.style.display = "block";

    nextEl.classList.remove("animate-in");
    void nextEl.offsetWidth; 
    nextEl.classList.add("animate-in");
}

g.addEventListener("click", () => triggerTransition(g, a1));
a1.addEventListener("click", () => triggerTransition(a1, u));
u.addEventListener("click", () => triggerTransition(u, r));
r.addEventListener("click", () => triggerTransition(r, a2));
a2.addEventListener("click", () => triggerTransition(a2, v));
v.addEventListener("click", () => triggerTransition(v, gaurav));
gaurav.addEventListener("click", () => triggerTransition(gaurav, g)); 