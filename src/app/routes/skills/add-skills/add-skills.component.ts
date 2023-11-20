import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesService } from '../../../services/routes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SkillsService } from '../../../services/skills.service';
import { ResumeService } from '../../../services/resume.service';

@Component({
  selector: 'app-add-skills',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.css',
})
export class AddSkillsComponent {
  constructor(
    public routeService: RoutesService,
    public skillsService: SkillsService,
    public route: ActivatedRoute,
    public router: Router,
    public resumeService: ResumeService
  ) {}
  jobTitle = '';
  skillList: string[] = [];
  addedSkills: string[] = [];
  addedSkillsString: string = '';

  ngOnInit() {
    this.skillsService.getSkillsList('Soft Skills').subscribe((skills) => {
      this.skillList = skills.skillListData;
    });
    this.skillsService.fetchAddedSkills().subscribe((addedSkills) => {
      this.addedSkills = addedSkills.addedSkillList;
      this.updateAddedSkillsString();
    });
  }

  handleJobTitleInput(event: any) {
    this.jobTitle = event.target.value;
  }

  handleSkillInput(event: any) {
    this.addedSkills = event.target.value.split('\n');
    console.log(this.addedSkills);
  }

  getSkillsList() {
    this.skillsService.getSkillsList(this.jobTitle).subscribe((skills) => {
      this.skillList = skills.skillListData;
    });
  }

  addSkilltoList(skill: string) {
    const newSkillList = [...this.addedSkills.filter(Boolean)];
    newSkillList.push(skill);

    this.addedSkills = newSkillList;
    this.updateAddedSkillsString();
  }

  removeSkillFromList = (skill: string) => {
    this.addedSkills = this.addedSkills?.filter((s) => s !== skill);
    this.updateAddedSkillsString();
  };

  updateAddedSkillsString() {
    this.addedSkillsString = this.addedSkills.reduce(
      (acc, skill, currentIndex) => {
        if (currentIndex === 0) {
          return skill;
        } else {
          return acc + '\n' + skill;
        }
      },
      ''
    );
  }

  handleNextClick() {
    console.log('next clicked');
    this.skillsService.updateSkillsInDB(this.addedSkills);
    this.resumeService.addedSkillsList = this.addedSkills;

    this.routeService.updateRoutes(this.route, this.router);
    this.routeService.goToNextRoute();
  }
}
