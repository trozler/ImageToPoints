/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  let template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes[0].firstChild;
}

/**
 * @param {String} imageurl. Image can be .png, .jpeg
 * @param {boolean} draw. True if you want the points dsiplayed.
 * @param {Number} n_points.
 * @return {Array<SVGPointList>} Points array, where arr[k].x and arr[k].y access the x and y coordinates of the kth sampled point.
 */
export function pathfinderImage(imageurl, draw, n_points) {
  // This will load an jpeg, png trace it, and execute callback on the tracedata
  //Uses functions from imagetracer_v1.2.6_trozler.js, which have been loaded in index.html.
  ImageTracer.imageToTracedata(
    imageurl,
    function (tracedata) {
      /**@returns svg string, with a singel path element */
      let svgstr = ImageTracer.getsvgstring(tracedata, "grayscale");
      //Convert svg to html element.
      let htmlsvg = htmlToElements(svgstr);

      if (draw) {
        let canvas = document.getElementById("pointscanvas");
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");
      }

      //Find points
      let arr = [];
      let path = htmlsvg;
      for (let i = 0; i < n_points; i++) {
        let point = path.getPointAtLength(
          (i / n_points) * path.getTotalLength()
        );
        arr.push(point);
        if (draw) {
          ctx.fillRect(point.x, point.y, 2, 2);
        }
      }
      //Points.
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
export function pathfinderSVG(pathTags, draw, n_points) {
  //Build new svg with singel path.
  var svgstr = "<svg " + 'version="1.1" xmlns="http://www.w3.org/2000/svg" >';

  let pathstring = pathTags[0].outerHTML;
  svgstr +=
    '<path d="' + pathstring.split('d="')[1].replace("/>", "").replace('"', "");
  for (let k = 1; k < pathTags.length; k++) {
    let pathstring = pathTags[k].outerHTML;
    svgstr += pathstring.split('d="')[1].replace("/>", "").replace('"', "");
  }
  svgstr += '"' + " stroke='rgb(0,0,0)' fill='transparent' />";
  svgstr += "</svg>";

  let htmlsvg = htmlToElements(svgstr);

  if (draw) {
    let canvas = document.getElementById("pointscanvas");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
  }

  //Find points
  let arr = [];
  let path = htmlsvg;
  for (let i = 0; i < n_points; i++) {
    let point = path.getPointAtLength((i / n_points) * path.getTotalLength());
    arr.push(point);
    if (draw) {
      ctx.fillRect(point.x, point.y, 2, 2);
    }
  }
  console.log(arr);
}
