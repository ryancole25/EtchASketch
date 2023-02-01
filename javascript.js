// Makes a grid to the specified size
function makeGrid(pixels_per_row){
    const container = document.querySelector('.container');
    
    const pixels_per_column = pixels_per_row;
    for (let i = pixels_per_column; i > 0; i += -1){
        // make a row
        const row = document.createElement('div');
        row.className = "row";
        for (let i = pixels_per_row; i > 0; i += -1){
            // Make the pixel in each column
            const column = document.createElement('div');
            column.className = "pixel";
            // Add the column to the row
            row.appendChild(column);
        }
        // Add the row to the container
        container.appendChild(row);
    }
}

// Clears the grid
function clearGrid(){
    const container = document.querySelector('.container');
    const rows = document.querySelectorAll('row');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    return;
}

// Add a hover effect
function hoverEffect(){
    const pixel = document.querySelectorAll('.pixel');
    pixel.forEach(pix => pix.addEventListener("mouseover", function(){
    pix.style.backgroundColor = "rgb(0, 0, 0)";
    }));
}

// Slider changes the grid size
let slider = document.querySelector(".slider");

makeGrid(parseInt(slider.value));
hoverEffect();

// Displays the dimensions of the etch-a-sketch at bottom of page
let dimensions = document.querySelector(".dimensions");
dimensions.textContent = `Dimensions: ${slider.value} x ${slider.value}`


// Reconfigure grid when adjusting slider
slider.oninput = function () {
    // Clear the grid DOM
    clearGrid();
    // Make a new grid with the dimensions from the slider
    makeGrid(parseInt(slider.value));
    // Change the text of the dimensions to reflect the new grid
    dimensions.textContent = `Dimensions: ${slider.value} x ${slider.value}`
    hoverEffect();
}

// Make buttons that clear the grid, allow you to change the color, and add an eraser
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function(){
    clearGrid();
    makeGrid(parseInt(slider.value));
    hoverEffect();
})

// Draw button that allows you to return to drawing in black again
const drawButton = document.querySelector('.draw');
drawButton.addEventListener("click", function(){
    hoverEffect();
})


// Eraser button that allows you to erase what you have done
const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', function(){
    eraserHover();
});

// Add an eraser effect
function eraserHover(){
    const pixel = document.querySelectorAll('.pixel');
    pixel.forEach(pix => pix.addEventListener("mouseover", function(){
        pix.style.backgroundColor = "rgb(255, 255, 255)";
    }));
}

// Rainbow button that draws with random colors
const rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener("click", function(){
    rainbowDraw();
})

// Generates random color and draws it over squares when MouseOver
function rainbowDraw(){
    const pixel = document.querySelectorAll('.pixel');
    pixel.forEach(pix => pix.addEventListener("mouseover", function(){
        let color = randomColor();
        pix.style.backgroundColor = color;
    }));
}

// Generates a random color
function randomColor(){
    let rand_color = Math.floor(Math.random()*16777215).toString(16);
    return "#" + rand_color;
};

// Shading button that darkens the pixels a little each time when you pass over them
shadingButton = document.querySelector(".shading");
shadingButton.addEventListener('click', function(){
    clearGrid();
    makeGrid(parseInt(slider.value));
    shadingDraw();
});

// Gives all pixels a white background initially, then checks the color and darkens slightly after each pass
function shadingDraw(){
    const pixel = document.querySelectorAll('.pixel');
    // Give every pixel a white background color
    pixel.forEach(pix => pix.style.backgroundColor = "#FFFFFF");
    pixel.forEach(pix => pix.addEventListener("mouseover", function(){
        let original_color = pix.style.backgroundColor;
        // unformatted RGB to hex
        original_color = rgb2hex(original_color);
        // // Convert hex color to rgb
        rgbColor = hexToRgb(original_color);
        // Change r g b values by 10%
        rgbColor.r = Math.floor(rgbColor.r * 0.90);
        rgbColor.g = Math.floor(rgbColor.g * 0.90);
        rgbColor.b =Math.floor(rgbColor.b * 0.90);
        // Convert new rgbColor back to hex
        original_color = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
        // Assign the color change to the pixel
        pix.style.backgroundColor = original_color;
    }));
}

// Takes the .backgroundColor and converts it to useable hex
function rgb2hex(rgb) {
    return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
}

// Gets r, g, and b elements from a hex number
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

// Allows for modified r, g, b to be converted to hex
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

