// TODO
// Set up a way to change the number of pixels in a row on the webpage itself
// Add an option to change the color of the pixels
// Add a clear button
// Add an eraser

// Set how many pixels you want in a row 
let pixels_per_row = 16;

makeGrid(pixels_per_row);
hoverEffect();

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

// Add a hover effect
function hoverEffect(){
    const pixel = document.querySelectorAll('.pixel');
    console.log(pixel);
    pixel.forEach(pix => pix.addEventListener("mouseover", function(){
        pix.style.backgroundColor = "black";
    }));
}


