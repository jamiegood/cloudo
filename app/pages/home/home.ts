import {Component} from "@angular/core";
import {NavController, AlertController} from 'ionic-angular';
import {Todos} from '../../providers/todos/todos';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  todos: any;

  constructor(private nav: NavController, private todoService: Todos, private alertCtrl: AlertController) {

  }

  ionViewLoaded(){
    this.todoService.getTodos().then((data) => {
        this.todos = data;
    });
  }

  createTodo(){

    //console.log(AlertController);
    console.log('ddd');
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });

    //this.nav.push(prompt);
    prompt.present();

  }

  updateTodo(todo){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
                _id: todo._id,
                _rev: todo._rev,
                title: data.title
            });
          }
        }
      ]
    });

    prompt.present();
    //this.nav.push(prompt);
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

}
