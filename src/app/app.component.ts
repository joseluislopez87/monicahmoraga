import { Component } from "@angular/core";
import { fadeAnimation } from "./animations";
import { Router, NavigationEnd } from "@angular/router";
import {filter} from 'rxjs/operators';

declare var gtag;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent {

  constructor(private router: Router) {
    const navEndEvents$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    );

    // Google Analytics
    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-108857734-1', {
        'page_path': event.urlAfterRedirects
      });
    });
  }
}
