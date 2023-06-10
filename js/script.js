const grid          = document.querySelector(".grid");
const rainbowBtn    = document.querySelector("#rainbow");
const randomBtn     = document.querySelector("#random");
const gridRange     = document.querySelector("input[type=\"range\"]");
const gridBtn       = document.querySelector("#show-grid");
const eraser        = document.querySelector("#eraser");
const clear         = document.querySelector("#clear");
const colorPicker   = document.querySelector("input[type='color']");
const settingsBtns  = document.querySelectorAll(".settings-button");

let showingGrid     = false;
let erasing         = false;
let rainbow         = false;
let holding         = false;
let randomColor;


function createGrid(n)
{
    grid.replaceChildren();

    for(let i = 1; i <= n*n; i++)
    {
        const pixel = document.createElement("div");
        pixel.style.flexBasis = `${600/n}px`;
        grid.appendChild(pixel);
        
        createEventListeners(pixel);
        
        if(showingGrid)
        {
            pixel.classList.toggle("border-pixel");
        }
    }
}

function createEventListeners(pixel)
{
    pixel.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if(e.which == 1)
        {
            holding = true;
            if(erasing)
            {
                pixel.style.backgroundColor = "var(--color-grid-default)";
            }
            else if(rainbow)
            {
                pixel.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            }
            else pixel.style.backgroundColor = colorPicker.value;
        }
    });

    pixel.addEventListener("mouseover", () => {
        if(holding === true)
        {
            if(erasing)
            {
                pixel.style.backgroundColor = "var(--color-grid-default)";
            }
            else if(rainbow)
            {
                pixel.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            }
            else pixel.style.backgroundColor = colorPicker.value;
        }
    });

    pixel.addEventListener("mouseup", ()=> {
        holding = false;
    });
}

grid.addEventListener("mouseleave", ()=> {
    holding = false;
});

eraser.addEventListener("click", () => {
    eraser.classList.toggle("active");
    rainbowBtn.classList.remove("active");

    erasing = !erasing;
    rainbow = false;
});

rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.toggle("active");
    eraser.classList.remove("active");
 
    rainbow = !rainbow;
    erasing = false;
 });
 
gridBtn.addEventListener("click", () => {
    const pixels = document.querySelectorAll(".grid > div");
    gridBtn.classList.toggle("active");

    pixels.forEach((pixel) => {
        pixel.classList.toggle("border-pixel");
    });
    showingGrid = !showingGrid;
});

randomBtn.addEventListener("click", () => {

    rainbowBtn.classList.remove("active");
    eraser.classList.remove("active");
    
    randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    colorPicker.value = randomColor;

    erasing = false;
    rainbow = false;
});

clear.addEventListener("click", () => {
    const pixels = document.querySelectorAll(".grid > div");

    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "unset";
    })
});


gridRange.addEventListener("change", () => {
    createGrid(gridRange.value);
    const gridText = document.querySelector("label[for=\"grid\"]");
    gridText.innerHTML = `${gridRange.value}x${gridRange.value}`;
});


settingsBtns.forEach((btn) => {
    btn.addEventListener("selectstart", (e) => e.preventDefault())
});

// initial grid
createGrid(32);
