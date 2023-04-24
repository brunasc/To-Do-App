import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoList } from 'src/app/models/to-do-list';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  task!: string;
  listToDo: ToDoList[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      task: ['', [Validators.required]]
    })
  }

  addTask() {
    let task = this.form.get('task')?.value;
    let id = this.listToDo.length + 1;
    this.listToDo.push(new ToDoList(id, task, false));
    this.save();
    this.clear();
  }

  removeTask(list: ToDoList) {
    const index = this.listToDo.indexOf(list);
    if (index !== -1) {
      this.listToDo.splice(index, 1);
    }
  }

  markAsDone(list: ToDoList) {
    list.done = true;
    this.save();
  }

  markAsUndone(list: ToDoList) {
    list.done = false;
    this.save();
  }

  clear() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.listToDo);
    localStorage.setItem('ToDo List', data);
  }

  

}
