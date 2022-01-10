import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from './task';
import { TasksService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  
  tarefaForm: FormGroup;
  tarefa: Task;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {}

  adicionarTarefa() {
    if (this.tarefaForm.dirty && this.tarefaForm.valid) {
      this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
      
      this.tasksService.adicionar(this.tarefa);
      this.tarefaForm.reset();
    }
  }
  
  ngOnInit() {
    this.tarefaForm = this.fb.group({
      nome: [''],      
    });
  }
}