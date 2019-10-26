import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonState {
  state: boolean;
  id: string;

}

export class LoadingButtonService {
  isLoading = new Subject<ButtonState>();

  start(id: string) {
    this.isLoading.next({state: true, id: id});
  }

  stop(id: string) {
    this.isLoading.next({state: false, id: id});
  }
}
