import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { RoutesService } from '../../../services/routes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  constructor(
    public routeService: RoutesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
}
