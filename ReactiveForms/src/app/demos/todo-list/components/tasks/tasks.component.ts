import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TasksService } from '../../todo.service';
import { Store } from '../../todo.store';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {

  todolist$: Observable<any[]>;
  susbcription: Subscription;

  constructor(private taskService: TasksService, private store: Store) { }

  ngOnInit() {
    this.todolist$ = this.store.getTodoList().pipe(map(todolist => todolist.filter(task => !task.iniciado && !task.finalizado)));

    this.susbcription = this.taskService.getTodoList$.subscribe();
  }
  
  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }
}