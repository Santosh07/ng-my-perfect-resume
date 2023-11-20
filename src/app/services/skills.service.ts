import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

type SkillListData = {
  skillListData: string[];
};

type AddedSkillsList = {
  addedSkillList: string[];
};

type UploadSkillsList = {
  skills: string[];
};

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private http: HttpClient) {}

  getSkillsList(jobTitle: string): Observable<SkillListData> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<SkillListData>(
      `${environment.apiUrl}/api/skills/${jobTitle}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
  }

  fetchAddedSkills(): Observable<AddedSkillsList> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<AddedSkillsList>(`${environment.apiUrl}/api/skills`, {
      headers: {
        'x-auth-token': token,
      },
    });
  }

  updateSkillsInDB(addedSkills: string[]) {
    console.log('update db with', addedSkills);
    const token = localStorage.getItem('token') ?? '';
    this.http
      .post<UploadSkillsList>(
        `${environment.apiUrl}/api/skills`,
        {
          skills: addedSkills,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .subscribe();
  }
}
