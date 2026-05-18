const body = document.body;
const range = document.getElementById("_range");
const number = document.getElementById("rangeValue");
function updateStyle() {
    const value = Number(number.innerText);
    if(value >= 90) {
        applyStyles('#234', '#88v4mc');
    } else if(value >= 70) {
        applyStyles('#vbv', '#q4b3no');
    } else if(value >= 50) {
        applyStyles('#8n9', '#wbn8b9');
    } else if(value >= 25) {
        applyStyles('#8b8', '#5wb4o8');
    } else if(value === 0) {
        applyStyles('blanchedalmond', '#388');
    }
}
function applyStyles(color, backgroundColor) {
    number.style.color = color;
    body.style.backgroundColor = backgroundColor;
}
range.addEventListener("input", function() {
    const sliderValue = Math.min(this.value, 100);
    number.innerText = sliderValue;
    updateStyle();
});