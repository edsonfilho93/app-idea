import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IdeaService } from 'src/app/shared/services/idea.service';
import { Idea } from 'src/app/shared/models/Idea';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {
  updateFormGroup: FormGroup;
  id: any;

  constructor(
    private service: IdeaService,
    private atRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.atRoute.snapshot.paramMap.get('id');
    this.service
      .get(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updateFormGroup.setValue(res);
      });
  }

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
    });
  }

  updateForm() {
    this.service
      .update(this.id, this.updateFormGroup.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
  }
}
