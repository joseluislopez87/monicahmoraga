import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-thanks",
  templateUrl: "./thanks.component.html",
  styleUrls: ["./thanks.component.scss"]
})
export class ThanksComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(function() {
      window.location.href = ""; //will redirect to your blog page (an ex: blog.html)
    }, 5000); //will call the function after 2 secs.
  }
}
