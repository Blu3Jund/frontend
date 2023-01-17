import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Store } from "@ngrx/store";

import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { isPlatformBrowser } from "@angular/common";

import * as ProductActions from "./products/store/product.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  // styleUrls: ['./app.component.css']
  styles: [
    `
      h3 {
        color: dodgerblue;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.AUTO_LOGIN());
    }
    this.store.dispatch(ProductActions.FETCH_PRODUCTS());
  }
}
