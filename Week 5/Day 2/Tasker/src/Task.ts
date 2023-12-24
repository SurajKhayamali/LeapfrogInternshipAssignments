import { RANDOMIZED_CHARACTER_LENGTH_FOR_ID } from './constants';
import { getRandomString } from './utils';

export interface ITask {
  id: string;
  value: string;
  completed: boolean;

  toggleCompleted: () => void;
  setCompleted: (completed: boolean) => void;
  getCompleted: () => boolean;

  setValue: (value: string) => void;
  getValue: () => string;
}

export class Task implements ITask {
  id: string;
  value: string;
  completed: boolean;

  constructor(value = '', completed = false) {
    this.id = getRandomString(RANDOMIZED_CHARACTER_LENGTH_FOR_ID);
    this.value = value;
    this.completed = completed;
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
  };

  setCompleted = (completed: boolean = true) => {
    this.completed = completed;
  };

  getCompleted = () => {
    return this.completed;
  };

  setValue = (value: string) => {
    this.value = value;
  };

  getValue = () => {
    return this.value;
  };
}
