const darkmode = document.querySelector(".toggle-darkmode")

let color = [ 
    [
        "hsl(0, 0%, 91%)",
        "#1b1e40",
    ],
    [
        "hsl(0, 0%, 92%)",
        "#2b2f63",    
    ],
    [
        "hsl(0, 0%, 84%)",
        "#313572",
    ],
    [
        "hsl(0, 0%, 0%)",
        "white",
    ],
    [
        "hsl(16, 77%, 64%)",
        "hsl(16, 77%, 64%)",
    ],
    [
        "hsl(16, 100%, 79%)",
        "hsl(16, 100%, 79%)",
    ],
    [
        "hsl(0, 0%, 100%)",
        "hsl(0, 0%, 100%)"
    ],
    [
        "hsl(0, 0%, 0%)",
        "hsl(0, 0%, 0%)",
    ],
    [
        "rgb(209, 117, 78)",
        "rgb(209, 117, 78)",
    ],
    [
        "rgb(231, 150, 116)",
        "rgb(231, 150, 116)",
    ],
]

let i = 1;
const switchTheme = () => {
    document.documentElement.style.setProperty('--main-color', color[0][i%2]);
    document.documentElement.style.setProperty('--elements-color', color[1][i%2]);
    document.documentElement.style.setProperty('--elements-color-hover', color[2][i%2]);
    document.documentElement.style.setProperty('--text-color', color[3][i%2]);
    document.documentElement.style.setProperty('--creative-element', color[4][i%2]);
    document.documentElement.style.setProperty('--creative-element-hover', color[5][i%2]);
    document.documentElement.style.setProperty('--white', color[6][i%2]);
    document.documentElement.style.setProperty('--black', color[7][i%2]);
    document.documentElement.style.setProperty('--creative-element-2', color[5][i%2]);
    document.documentElement.style.setProperty('--creative-element-2-hover', color[8][i%2]);
}

switchTheme();
darkmode.addEventListener("click", () => {
    switchTheme();
})
