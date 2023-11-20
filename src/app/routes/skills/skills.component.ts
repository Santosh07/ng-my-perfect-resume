import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  constructor(public router: Router, public routesService: RoutesService) {}

  ngOnInit() {
    this.routesService.updateCurrentIndex(
      this.router.url.replace('/', '').split('/')[0]
    );
  }
}
