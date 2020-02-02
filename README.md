# MeanVidPlayer

### To see the interval workings of this project

[routes](https://github.com/markwartman1/Video-Player/blob/master/server/routes/api.js)

[services](https://github.com/markwartman1/Video-Player/blob/master/src/app/services/video.service.ts)

### To run this project

This project uses a remote Database for Data persistence.  Therefore to run this project you will have to set up your own remote Database.  In this case I used MongoDB.  Place the URL string that the database offers inside of a file just like .env_sample; that is how the file api.js will find that data except the file api.js is currently set up to pull from a file called .env and not .env_sample.

Or else, you could change line #9 here in the api file: [here](https://github.com/markwartman1/Video-Player/blob/master/server/routes/api.js) you would change process.env to process.env_sample.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
