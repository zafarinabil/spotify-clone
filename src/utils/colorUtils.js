// Function to get the average color of an image
export const getAverageColor = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            let r = 0,
                g = 0,
                b = 0;

            // Iterate through each pixel and sum up the RGB values
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
            }

            // Calculate the average RGB values
            const numPixels = imageData.length / 4;
            const avgR = Math.floor(r / numPixels);
            const avgG = Math.floor(g / numPixels);
            const avgB = Math.floor(b / numPixels);

            // Convert RGB values to HEX format
            const avgColor = rgbToHex(avgR, avgG, avgB);

            resolve(avgColor);
        };

        img.onerror = function (error) {
            reject(error);
        };
    });
};

// Function to convert RGB values to HEX format
const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Example dark shades of various colors
export const darkShades = {
    pink: "#8a3b6d",
    green: "#006400",
    blue: "#00008b",
    red: "#8b0000",
    purple: "#4b0082",
    brown: "#8b4513",
    beige: "#f5f5dc",
    orange: "#8b4513",
    gray: "#2f4f4f"
};
