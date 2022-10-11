import { Component, OnInit } from '@angular/core';
import { LoadingModes } from '@ht/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ht-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.css'],
})
export class ModesComponent {
  private subject = new BehaviorSubject<LoadingModes>({
    loading: true,
    empty: false,
    errored: false,
  });

  get modes$() {
    return this.subject.asObservable();
  }

  setInitialState() {
    this.subject.next({
      loading: true,
      empty: false,
      errored: false,
    });
  }
  setLoadedAndNotEmpty() {
    this.subject.next({
      loading: false,
      empty: false,
      errored: false,
    });
  }

  setLoadedAndEmpty() {
    this.subject.next({
      loading: false,
      empty: true,
      errored: false,
    });
  }

  setLoadedAndErrored() {
    this.subject.next({
      loading: false,
      empty: false,
      errored: true,
    });
  }
}
