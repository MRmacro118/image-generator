document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const backgroundColor = document.getElementById('background').value;
    const text = document.getElementById('text').value;
    const textColor = document.getElementById('textColor').value;
    const ratio = document.getElementById('ratio').value;
    const includeBackground = document.getElementById('includeBackground').checked;
    const textAlign = document.querySelector('input[name="textAlign"]:checked').value;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Define base width and calculate height based on the aspect ratio
    const baseWidth = 500;
    let width, height;
    switch (ratio) {
        case '4:3':
            width = baseWidth;
            height = (baseWidth / 4) * 3;
            break;
        case '16:9':
            width = baseWidth;
            height = (baseWidth / 16) * 9;
            break;
        case '3:2':
            width = baseWidth;
            height = (baseWidth / 3) * 2;
            break;
        default: // '1:1'
            width = baseWidth;
            height = baseWidth;
            break;
    }

    canvas.width = width;
    canvas.height = height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the background color if the checkbox is checked
    if (includeBackground) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Set the text color
    ctx.fillStyle = textColor;
    ctx.font = '30px Arial';
    ctx.textBaseline = 'middle';

    // Set the text alignment
    ctx.textAlign = textAlign;

    // Calculate the x-coordinate based on the text alignment
    let x;
    if (textAlign === 'left') {
        x = 0;
    } else if (textAlign === 'right') {
        x = canvas.width;
    } else {
        x = canvas.width / 2;
    }

    // Draw the text in the center vertically
    ctx.fillText(text, x, canvas.height / 2);

    // Show the download button
    document.getElementById('downloadBtn').style.display = 'inline-block';
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const format = document.getElementById('format').value;
    const text = document.getElementById('text').value.trim();
    const sanitizedText = text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const link = document.createElement('a');
    link.download = `${sanitizedText}.${format}`;

    let dataURL;

    if (format === 'jpeg') {
        dataURL = canvas.toDataURL('image/jpeg', 1.0); // Set quality to 1.0 (high)
    } else if (format === 'webp') {
        dataURL = canvas.toDataURL('image/webp', 1.0); // Set quality to 1.0 (high)
    } else if (format === 'bmp') {
        dataURL = canvas.toDataURL('image/bmp');
    } else {
        dataURL = canvas.toDataURL('image/png');
    }

    link.href = dataURL;
    link.click();
});
const modeToggle = document.getElementById('modeToggle');
const container = document.querySelector('.container');

modeToggle.addEventListener('click', () => {
    container.classList.toggle('dark-mode');
});
