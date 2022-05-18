import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IdeaService } from 'src/app/shared/services/idea.service';

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.page.html',
  styleUrls: ['./idea-create.page.scss'],
})
export class IdeaCreatePage implements OnInit {
  ideaForm: FormGroup;

  constructor(
    private service: IdeaService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.ideaForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
    });
  }

  formSubimit() {
    if (this.ideaForm.valid) {
      this.service
        .add(this.ideaForm.value)
        .then((res) => {
          this.ideaForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    } else {
      return false;
    }
  }
}
