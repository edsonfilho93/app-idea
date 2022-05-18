import { Component } from '@angular/core';
import { Idea } from '../shared/models/Idea';
import { IdeaService } from '../shared/services/idea.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list = [];
  constructor(private service: IdeaService) {}

  ngOnInit() {
    let ideas = this.service.getIdeas();
    ideas.snapshotChanges().subscribe((res) => {
      this.list = [];
      res.forEach((obj) => {
        let idea = obj.payload.toJSON();
        idea['$key'] = obj.key;
        this.list.push(idea as Idea);
      });
    });
  }

  deleteIdea(key: string) {
    if (window.confirm('Você deseja realmente deletar essa ideia ?'))
      this.service.delete(key);
  }
}
