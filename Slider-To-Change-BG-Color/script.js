const body = document.body;
const range = document.getElementById("_range");
const number = document.getElementById("rangeValue");
function updateStyle() {
    const value = Number(number.innerText);
    if(value >= 90) {
        applyStyles('#234', '#88e4ab');
    } else if(value >= 70) {
        applyStyles('#bb0', '#f4b3eb');
    } else if(value >= 50) {
        applyStyles('#fb9', '#6bb8b9');
    } else if(value >= 25) {
        applyStyles('#fb8', '#55b468');
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