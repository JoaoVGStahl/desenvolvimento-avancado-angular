import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';
import { Store } from './todo.store';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksService {

  private urlBase: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private store : Store) { }

  // * $ utilizado como convenção para deixar claro que é um observable
  getTodoList$: Observable<Task[]> = this.http.get<Task[]>(this.urlBase + '/todolist').pipe(tap(next => this.store.set('todolist', next)));

  /* getTodoList(): Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:3000/todolist')
  } */

}