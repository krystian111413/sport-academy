import {OnDestroy, OnInit} from "@angular/core";
import {ProjectSelectorEventEmitterService} from "./project-selector-event-emitter.service";
import {Subscription} from "rxjs";

export abstract class OnSelectedProject implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private projectSelectorEventEmitterService: ProjectSelectorEventEmitterService) {
  }

  abstract onProjectSelected(): void;

  ngOnInit(): void {
    this.subscription = this.projectSelectorEventEmitterService.subscribe(() => {
      this.onProjectSelected();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
