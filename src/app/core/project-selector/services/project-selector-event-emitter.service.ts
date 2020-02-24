import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectSelectorEventEmitterService {
  selectedProjectEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  emit(selectedProjectName: string): void {
    this.selectedProjectEvent.emit(selectedProjectName)
  }

  subscribe(selectedFunction: () => void): Subscription {
    return this.selectedProjectEvent.subscribe(selectedFunction);
  }
}
