# Goal Editor for REG Gamification Project

This application is used as part of REG's To-Do List Gamification project. Our app serves two purposes:
- It provides a graphical user interface to create & edit goals or tasks
- It utilizes REG's To-Do List API to create daily task suggestions based on users' goals.

Currently, the app is meant to be integrated into the productivity app CompliceX to simplify important user interactions.

Therefore, the current version significantly differs from the [initial version](https://saksham36.github.io/todolistAPI-demoWebsite/dist/ToDo/intro) used in another experiment.
## Local development

Before you start setting up the project, ensure that you have an up-to-date version of [Node.js](https://nodejs.org/en/) installed on your machine.

This project is developed using the frontend-framework [Angular](https://angular.io/).

To speed up the development process, make sure to install the [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2 on your machine.
    
    yarn global add @angular/cli@11.2.2


Afterward, install the necessary dependencies for this project
    
    yarn

Then, start the local development server
    
    yarn start

In your browser, navigate to http://localhost:4200. The app will automatically reload if you change any of the source files.

## Deployment
To deploy a new production version of our app, run

    yarn build-prod

The production artifacts will be written to `dist/todo-list`.
They can then be copied/uploaded to the relevant target.
## Integration with CompliceX

Our app is currently integrated into CompliceX. To make integration easier, it is wrapped as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) using [Angular Elements](https://angular.io/guide/elements).
CompliceX & our app communicate via the Web Components API to exchange data & events. This enables us to encapsulate our application and potentially use it in other applications besides CompliceX as well (as long as the necessary data is passed to our app using the Web Components API).

## Project structure

All related source files are located in the directory `src/app`. They are structured as follows

- `/components` - Contains the individual UI components
- `/constants` - Contains constants that never change once the app is started.
- `/interfaces` - Contains type definitions for entities used in our app.
- `/provider` - Contains services that implement more abstract & complex logic (e.g API calls, handling state, etc.).

## Important files
- `index.html` - Wraps our app and provides a mocked context for it. That way, we can develop our app without actually integrating it into CompliceX.
- `app.module.ts` - Declares all relevant parts of our app & wraps them as an [Angular Element](https://angular.io/guide/elements)
- `app.component.ts` - Is responsibile for communicating through the Web Component API.
- `goal-editor.component.ts` - Provides the primary functions for creating & editing goals. It utilizes a number of smaller components (e.g. certain forms or popups) to assemble the full layout of the goal editor UI.
- `todo-list.service.ts` - Is responsible for posting user's data to the To-Do List API & publishing the received list of task suggestions throughout the app
- `goal.service.ts` - Is responsible for handling users' goals and publishing potential goal changes throughout the app.