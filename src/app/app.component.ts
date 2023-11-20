import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResumeService } from './services/resume.service';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    NavDrawerComponent,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-my-perfect-resume';
  opened = true;
  showMenu = false;
  mode = new FormControl('side' as MatDrawerMode);

  constructor(public resumeService: ResumeService) {
    const mediaQuery = window.matchMedia('screen and (min-width: 1024px)');
    const changeListener = (e: any) => {
      if (e.matches) {
        this.opened = true;
        this.showMenu = false;
        this.mode = new FormControl('side' as MatDrawerMode);
      } else {
        this.opened = false;
        this.showMenu = true;
        this.mode = new FormControl('over' as MatDrawerMode);
      }
    };
    changeListener(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', changeListener);
    } else {
      //for backward compatibility with older safari broswers
      mediaQuery.addListener(changeListener);
    }
  }
}
