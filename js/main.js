import { pathfinderImage, pathfinderSVG } from "./findPath.js";
//Dropzone config.
Dropzone.options.myDropzone = {
  acceptedFiles: "image/jpeg,image/png,image/gif,image/svg+xml",
  maxFiles: 1,
  maxThumbnailFilesize: 50,

  init: function () {
    //When file has been added to dropzone create a new image. This image will be set to  the newly uploaded image.
    this.on("addedfile", function (file) {
      const preview = document.getElementById("temp1")
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert uploaded image file to base64 string
          preview.title = file.name;
          //set source to image.
          preview.src = reader.result;
          //Finally make call to main flow depending on image uploaded. 
          if (file.type !== "image/svg+xml") {
            mainPathFinder(preview, false);
          } else {
            mainPathFinder(preview, true);
          }
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });

    this.on("addedfile", function (file) {
      if (this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
    });
  },
};

var n_points = 1000;

//Main flow begins.
function mainPathFinder (image, svgBool) {
  if (svgBool) {
    points = pathfinderSVG(image.src, true, n_points);
  } else {
    pathfinderImage(image.src, true, n_points);
  }
}

