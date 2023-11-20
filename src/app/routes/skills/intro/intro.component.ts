import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesService } from '../../../services/routes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
