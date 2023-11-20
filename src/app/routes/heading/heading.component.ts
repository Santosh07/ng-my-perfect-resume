import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {
  constructor(public router: Router, public routesService: RoutesService) {}

  ngOnInit() {
    this.routesService.updateCurrentIndex(
      this.router.url.replace('/', '').split('/')[0]
    );
  }
}
