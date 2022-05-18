import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Idea } from '../models/Idea';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  ideaListRef: AngularFireList<any>;
  ideaRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  get(id: String) {
    return this.db.object('/idea/' + id);
  }

  getIdeas() {
    return this.db.list('/idea');
  }

  add(obj: Idea) {
    return this.db.list('/idea').push({
      email: obj.email,
      name: obj.name,
      mobile: obj.mobile,
    });
  }

  delete(id: string) {
    this.db.object('/idea/' + id).remove();
  }

  update(id, obj: Idea) {
    return this.get(id).update({
      email: obj.email,
      name: obj.name,
      mobile: obj.mobile,
    });
  }
}
