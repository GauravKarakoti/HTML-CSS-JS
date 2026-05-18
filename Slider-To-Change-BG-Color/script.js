const body = document.body;
const range = document.getElementById("_range");
const number = document.getElementById("rangeValue");

function updateStyle(value) {
    const hue = value * 3.6; 

    const bgColor = `hsl(${hue}, 60%, 50%)`;
    
    const textColor = `hsl(${(hue + 180) % 360}, 80%, 30%)`;

    applyStyles(textColor, bgColor);
}

function applyStyles(color, backgroundColor) {
    number.style.color = color;
    body.style.backgroundColor = backgroundColor;
}

updateStyle(Number(range.value)); 

range.addEventListener("input", function() {
    const sliderValue = Number(this.value);
    number.innerText = sliderValue;
    
    updateStyle(sliderValue); 
});