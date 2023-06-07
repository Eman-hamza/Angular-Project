import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  private userSource = new BehaviorSubject<string>('');
  user = this.userSource.asObservable()
  constructor() { }
  changeUser(user: string) {
    this.userSource.next(user);
  }
}
