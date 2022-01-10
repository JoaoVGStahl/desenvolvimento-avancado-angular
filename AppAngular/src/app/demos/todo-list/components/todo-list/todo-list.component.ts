import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../task";
import { TasksService } from '../../todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  constructor(private tasksService: TasksService){}

  @Input()
  list: Task[];

  @Output()
  toggle = new EventEmitter<any>();

  toggleItem(index: number, acao: string) {
    const task = this.list[index];

    switch (acao) {
      case 'iniciar':
        task.finalizado = false;
        task.iniciado = true;
        break; 
      case 'finalizar':
        task.finalizado = true;
        task.iniciado = false;
        break; 
      case 'retomar':
        task.finalizado = false;
        task.iniciado = true;
        break; 
      case 'cancelar':
        task.finalizado = false;
        task.iniciado = false;
        break;      
    }

    this.toggle.emit({
      task: { ...task }
    });    
  }

  excluir(id: number) {
    this.tasksService.remover(id);
  }
}