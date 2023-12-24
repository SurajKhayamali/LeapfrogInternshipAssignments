// import 'normalize.css';
import './assets/styles/scss/main.scss';

import { TaskControl } from './TaskControl';
import { UIControl } from './UIControl';

const taskControl = new TaskControl();
const uiControl = new UIControl(taskControl);

uiControl.render();
