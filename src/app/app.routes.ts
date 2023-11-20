import { Routes } from '@angular/router';
import { HeadingComponent } from './routes/heading/heading.component';
import { WorkExperienceComponent } from './routes/work-experience/work-experience.component';
import { EducationComponent } from './routes/education/education.component';
import { SkillsComponent } from './routes/skills/skills.component';
import { IntroComponent as HeadingIntroComponent } from './routes/heading/intro/intro.component';
import { FormComponent as HeadingFormComponent } from './routes/heading/form/form.component';
import { FormComponent as WorkExperienceFormComponent } from './routes/work-experience/form/form.component';
import { FormComponent as EductionFormComponent } from './routes/education/form/form.component';
import { IntroComponent as SkillsIntroComponent } from './routes/skills/intro/intro.component';

export const routes: Routes = [
  {
    path: 'heading',
    component: HeadingComponent,
    children: [
      { path: 'intro', component: HeadingIntroComponent },
      { path: 'form', component: HeadingFormComponent },
    ],
  },
  {
    path: 'work-experience',
    component: WorkExperienceComponent,
    children: [{ path: 'form', component: WorkExperienceFormComponent }],
  },
  {
    path: 'education',
    component: EducationComponent,
    children: [{ path: 'form', component: EductionFormComponent }],
  },
  {
    path: 'skills',
    component: SkillsComponent,
    children: [{ path: 'intro', component: SkillsIntroComponent }],
  },
];
