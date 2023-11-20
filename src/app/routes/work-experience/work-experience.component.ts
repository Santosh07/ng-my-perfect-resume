import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css',
})
export class WorkExperienceComponent {
  constructor(public router: Router, public routesService: RoutesService) {}

  ngOnInit() {
    this.routesService.updateCurrentIndex(
      this.router.url.replace('/', '').split('/')[0]
    );
  }
}
