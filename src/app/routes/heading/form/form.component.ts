import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesService } from '../../../services/routes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  constructor(
    public routeService: RoutesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
}
