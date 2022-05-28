# Demo Website for REG ToDo List Gamification Project"

## Page information
 ```src/app/components/todo-list/todo-list.component.ts```
 is the file which contains the front-end where the user can enter the goals and tasks.
 
 ```src/app/components/optimized-list/optimized-list.component.ts```
 is the file which contains the front-end where the optimized gamified to-do list is shown.
 
```src/app/provder/item.service.ts``` 
contains the file which handles the API POST call. The Cross-Origin Resource Sharing has been fixed by means of an OPTION call which verifies that the domain https://saksham36.github.io is verified to access the API.

## Website Deployment Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
