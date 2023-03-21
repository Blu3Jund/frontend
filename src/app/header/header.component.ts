import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as ProductActions from '../products/store/product.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  collapsed = true;

  onSaveData() {
    this.store.dispatch(ProductActions.STORE_PRODUCTS());
  }

  onFetchData() {
    this.store.dispatch(ProductActions.FETCH_PRODUCTS());
  }

  onMockData() {
    this.store.dispatch(ProductActions.MOCK_PRODUCTS());
  }
  onDeleteData() {
    this.store.dispatch(ProductActions.DELETE_PRODUCTS());
  }

  onLogout() {
    this.store.dispatch(AuthActions.LOGOUT());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
