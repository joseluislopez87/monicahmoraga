import { Component, OnInit, AfterViewInit } from "@angular/core";
import { photos, photoTemplate } from "./data";

declare var $: any;
declare var salvattore: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    salvattore.init();
    this.selectCategory(null);
  }

  constructor() {}

  ngOnInit() {}

  selectCategory(category) {
    $("#mhm-board")
      .find(".item")
      .remove();
    var grid = document.querySelector("#mhm-board");

    $.each(photos, function(index, photo) {
      if (category === null || (photo.cat != null && photo.cat == category)) {
        var photoCode = photoTemplate.replace(/\[filename\]/g, photo.filename);
        photoCode = photoCode.replace(
          /\[title\]/g,
          photo.title === undefined ? "" : photo.title
        );
        if (photo.description !== undefined) {
          var descriptionCode =
            '<div class="mhm-desc">' + photo.description + "</div>";
          photoCode = photoCode.replace(/\[description\]/g, descriptionCode);
        } else {
          photoCode = photoCode.replace(/\[description\]/g, "");
        }

        var item = document.createElement("div");
        salvattore["append_elements"](grid, [item]);
        item.outerHTML = photoCode;
      }
    });
    this.magnifPopup();
  }

  magnifPopup() {
    $(".image-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      titleSrc: "title",
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        }
      }
    });
  }
}
