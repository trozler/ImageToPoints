## Image to path - a fast and simple implmentation.

![new version][1]![imagtracer][2]![License][3]

![](./promo/promo_raw.gif)

[1]: https://img.shields.io/badge/release-Version2-%09%2332CD32
[2]: https://img.shields.io/badge/-imagetracer.js-yellow
[3]: https://img.shields.io/badge/license-MIT-orange

![](https://media.giphy.com/media/SXadTDcBz24BCIv8kh/giphy.gif)

This code takes any image (png, jpeg, svg, gif) as input, it then traces the outline of the image (by converting the image to an svg), and outputs the path of the image in terms of cartesian coordinates to console.

### Important notes - update 30th July 2020. V2 release.

- The output in version 2 is a 2D array, where each sub array corresponds to the cartesian coordinates of a single svg path element, within the correspoding svg of the image. Recall an svg can have several path elements.
- These subarrays can be concatonated to a single array without worriying about destroying anything (as was in V1). The output format is meant to give the user more clarity.
- The number of sample points can be increased in `main.js`.

### How to run

- node.js: `npm install` and then of you go.
