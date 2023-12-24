import { Task } from './Task';
import { ALPHABET_SET, NUMBER_SET } from './constants';

const RADIX_VALUE = 36;

function getUniqueIdFromTimestamp(): string {
  return new Date().getTime().toString(RADIX_VALUE);
}

// function getTimeStampFromUniqueIdGenerated(id: string): number {
//   return parseInt(id, RADIX_VALUE);
// }

export function getRandomString(length: number): string {
  const uniqueIdFromTimestamp = getUniqueIdFromTimestamp();

  const characters = ALPHABET_SET + NUMBER_SET;

  let result = '';

  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return `${result}-${uniqueIdFromTimestamp}`;
}

export function validateFormInput(value: string, todos: Task[]) {
  if (!value) {
    alert('Please enter a task');
    return false;
  }

  const isDuplicate = todos.some((todo) => todo.value === value);
  if (isDuplicate) {
    alert('Task with that value already exists');
    return false;
  }

  return true;
}
