export function processBase64Image(base64Image:any) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = base64Image;
  
      image.onload = () => {
        // Check if the image is not PNG
        if (image.src.indexOf('image/png') === -1) {
          // Create a canvas element
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Set canvas dimensions to match the image
          canvas.width = image.width;
          canvas.height = image.height;
  
          // Draw the image on the canvas
          ctx?.drawImage(image, 0, 0);
  
          // Define the background color to be removed (e.g., white)
          const backgroundColor = 'rgb(255, 255, 255)';
  
          // Get the image data
          const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  
          // Loop through each pixel and check if it matches the background color
          for (let i = 0; i < imageData!.data.length; i += 4) {
            const red = imageData!.data[i];
            const green = imageData!.data[i + 1];
            const blue = imageData!.data[i + 2];
  
            // Check if the pixel matches the background color
            if (
              red === backgroundColor.red &&
              green === backgroundColor.green &&
              blue === backgroundColor.blue
            ) {
              // Set the alpha channel to 0 to make it transparent
              imageData!.data[i + 3] = 0;
            }
          }
  
          // Put the modified image data back on the canvas
          ctx?.putImageData(imageData!, 0, 0);
  
          // Convert the canvas data to a PNG base64 image
          const modifiedBase64Image = canvas.toDataURL('image/png');
  
          // Resolve with the processed image
          resolve(modifiedBase64Image);
        } else {
          // If it's already a PNG, no need to process it
          resolve(base64Image);
        }
      };
    });
  }
  