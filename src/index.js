import style from "./css/main.css";

import "@babel/polyfill";
import './js/polyfills/fetch';
import config from './js/config';
import { Main } from './js/Main';

const app = new Main(config);
app.init();