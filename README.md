## Image to path - a fast and simple implmentation.

![](https://media.giphy.com/media/SXadTDcBz24BCIv8kh/giphy.gif)

This code takes any image (png, jpeg, svg, gif) as input, it then traces the outline of the image (as if grayscale), and outputs the path of the image in terms of cartesian coordinates to console.

### Important notes

- The number of sample points can be increased in `main.js`.
- This code makes use of a fork I made of the [imagetracerjs library](https://github.com/trozler/imagetracerjs). The API is used to convert an image to svg.

### How to run

- node.js: `npm install` and then of you go.
