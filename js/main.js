import { pathfinderImage, pathfinderSVG } from "./findPath.js";

//Dropzone config.
Dropzone.options.myDropzone = {
  acceptedFiles: "image/jpeg,image/png,image/gif,image/svg+xml",
  maxFiles: 1,
  maxThumbnailFilesize: 50,

  init: function () {
    //When file has been added to dropzone create a new image. This image will be set to  the newly uploaded image.
    this.on("addedfile", function (file) {
      const preview = new Image();
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (e) {
          if (file.type !== "image/svg+xml") {
            // convert uploaded image file to base64 string
            preview.title = file.name;
            //set source to image.
            preview.src = reader.result;
            //Finally make call to main flow depending on image uploaded.
            mainPathFinder(preview, false);
          } else {
            var svgData = e.target.result;
            svgData = svgData.slice(svgData.indexOf("<svg"));
            var parser = new DOMParser();
            var doc = parser.parseFromString(svgData, "image/svg+xml");
            var pathTags = doc.getElementsByTagName("path");
            mainPathFinder(pathTags, true);
          }
        },
        false
      );
      //Need url so we can pass image around.
      if (file) {
        if (file.type !== "image/svg+xml") {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      }
    });

    this.on("addedfile", function (file) {
      if (this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
    });
  },
};

//We only store evey 5 points. This can be increaed or decreased by users. Must always be a positive integer.
const factor = 5;

//Main flow begins.
function mainPathFinder(image, svgBool) {
  if (svgBool) {
    pathfinderSVG(image, true, factor);
  } else {
    pathfinderImage(image.src, true, factor);
  }
}
