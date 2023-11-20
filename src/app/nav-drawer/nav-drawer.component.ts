import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesService } from '../services/routes.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

type Step = {
  label: string;
};

@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [CommonModule, MatStepperModule],
  templateUrl: './nav-drawer.component.html',
  styleUrl: './nav-drawer.component.css',
})
export class NavDrawerComponent {
  steps: Step[];
  currentIndex = 0;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(
    public routesService: RoutesService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.steps = routesService.routes.map((rte) => {
      return { label: rte.label };
    });

    routesService.currentIndex.asObservable().subscribe((index) => {
      console.log('Current index =', this.currentIndex);
      console.log('index = ', index);

      if (index >= 0) {
        this.myStepper.ngAfterViewInit();
        if (this.currentIndex < index) {
          console.log('=== next');
          this.myStepper.next();
        } else {
          console.log('=== previous');
          this.myStepper.previous();
        }
        console.log('Updating to = ', index);
        this.currentIndex = index;
      }
    });
  }

  isStepActive(label: string) {
    return this.routesService.isStepActive(
      label,
      this.router.url.replace('/', '').split('/')[0]
    );
  }

  selectedIndex() {
    const currentRoute = this.router.url.replace('/', '').split('/')[0];
    return this.routesService.getIndex(currentRoute);
  }
}
