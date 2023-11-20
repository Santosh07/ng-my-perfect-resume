import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../../services/routes.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  constructor(
    public routeService: RoutesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.routeService.updateCurrentIndex(
      this.router.url.replace('/', '').split('/')[0]
    );
  }
}
