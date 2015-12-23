import angular from 'angular';
import {HomeController} from './controller';

let app = angular.module('app', [])
    .controller('HomeController', HomeController);

export default app;
