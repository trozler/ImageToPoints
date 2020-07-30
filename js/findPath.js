/**
 * @param {String} imageurl. Image can be .png, .jpeg
 * @param {boolean} draw. True if you want the points dsiplayed.
 * @param {Number} factor. A positive integer. Skip every "factor" number of points from path.
 * @return {Array<SVGPointList>} Points array, where arr[k].x and arr[k].y access the x and y coordinates of the kth sampled point.
 */
export function pathfinderImage(imageurl, draw, factor) {
  // This will load an jpeg, png trace it, and execute callback on the tracedata
  //Uses functions from imagetracer_v1.2.6_trozler.js, which have been loaded in index.html.
  ImageTracer.imageToTracedata(
    imageurl,
    function (tracedata) {
      /**@returns svg string*/
      let svgstr = ImageTracer.getsvgstring(tracedata, "grayscale");
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgstr, "image/svg+xml");
      var pathTags = doc.getElementsByTagName("path");

      if (draw) {
        let canvas = document.getElementById("pointscanvas");
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");
      }

      //Find points
      let arr = [];
      for (let j = 0; j < pathTags.length; j++) {
        //Find points
        arr.push([]);
        let path = pathTags[j];
        let pathLength = path.getTotalLength();
        let n_points = Math.floor(pathLength / factor);

        for (let i = 0; i < n_points; i++) {
          let point = path.getPointAtLength((i / n_points) * pathLength);
          arr[j].push(point);
          if (draw) {
            ctx.fillRect(point.x, point.y, 2, 2);
          }
        }
      }
      console.log(arr);
    },
    "grayscale"
  );
}

/**
 * For jezz this may be redundent, as you likley have a more efficient method.
//  * @param {String} image. Is an svg.
//  * @param {boolean} draw.
//  * @return {Array<SVGPointList>}.
//  */
export function pathfinderSVG(pathTags, draw, factor) {
  if (draw) {
    let canvas = document.getElementById("pointscanvas");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
  }

  //Find points
  let arr = [];
  for (let j = 0; j < pathTags.length; j++) {
    //Find points
    arr.push([]);
    let path = pathTags[j];
    let pathLength = path.getTotalLength();
    let n_points = Math.floor(pathLength / factor);

    for (let i = 0; i < n_points; i++) {
      let point = path.getPointAtLength((i / n_points) * pathLength);
      arr[j].push(point);
      if (draw) {
        ctx.fillRect(point.x, point.y, 2, 2);
      }
    }
  }
  console.log(arr);
}
