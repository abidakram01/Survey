Deploying the app into S3 bucket
--------------------------------

Prerequisites:
- Install Python 3.6 in your machine (https://www.python.org/downloads/).
- Install AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html)
- After installing AWS CLI, configure it by running the following command in terminal / command prompt:
  
  $ __aws configure__


Steps to deploy the project to S3 bucket:

1. cd into root project directory.

2. Make a production build by running the following command in terminal / command prompt:
   
   $ npm run build

3. Sync files from output/dist directory to S3 bucket:
   
   $ aws s3 sync --acl public-read --sse --delete output/dist s3://rayei-dev-site



Dev web app url : http://rayei-dev-site.s3-website.us-east-2.amazonaws.com

Dev api url     : http://ec2-13-59-72-71.us-east-2.compute.amazonaws.com:8000/v1/


# Rayei

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

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
