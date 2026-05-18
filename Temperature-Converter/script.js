function convertTemperature() {
    const celsiusInput = document.getElementById("celsius");
    const fahrenheitInput = document.getElementById("fahrenheit");

    const celsiusValue = celsiusInput.value.trim();
    const fahrenheitValue = fahrenheitInput.value.trim();

    if (celsiusValue !== "" && fahrenheitValue !== "") {
        alert("Please clear one field before converting.");
        return;
    }

    if (celsiusValue !== "") {
        const fahrenheit = (parseFloat(celsiusValue) * 9 / 5) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(2);
    }

    else if (fahrenheitValue !== "") {
        const celsius = (parseFloat(fahrenheitValue) - 32) * 5 / 9;
        celsiusInput.value = celsius.toFixed(2);
    }

    else {
        alert("Please enter a temperature");
    }
}