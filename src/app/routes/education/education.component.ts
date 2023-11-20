import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  constructor(public router: Router, public routesService: RoutesService) {}

  ngOnInit() {
    console.log("updating current index")
    this.routesService.updateCurrentIndex(
      this.router.url.replace('/', '').split('/')[0]
    );
  }
}
