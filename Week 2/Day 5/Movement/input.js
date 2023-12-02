const ACTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  JUMP: "jump",
};

const POSSIBLE_KEYS_FOR_ACTIONS = {
  [ACTIONS.UP]: ["w", "arrowup"],
  [ACTIONS.DOWN]: ["s", "arrowdown"],
  [ACTIONS.LEFT]: ["a", "arrowleft"],
  [ACTIONS.RIGHT]: ["d", "arrowright"],
  [ACTIONS.JUMP]: [" "],
};

const activeActions = {
  [ACTIONS.UP]: false,
  [ACTIONS.DOWN]: false,
  [ACTIONS.LEFT]: false,
  [ACTIONS.RIGHT]: false,
  [ACTIONS.JUMP]: false,
};

window.onkeydown = (e) => {
  //   console.log(e.code, e.key);
  const key = e.key.toLowerCase();

  for (const action in POSSIBLE_KEYS_FOR_ACTIONS) {
    if (POSSIBLE_KEYS_FOR_ACTIONS[action].includes(key)) {
      activeActions[action] = true;
    }
  }
};

window.onkeyup = (e) => {
  const key = e.key.toLowerCase();

  for (const action in POSSIBLE_KEYS_FOR_ACTIONS) {
    if (POSSIBLE_KEYS_FOR_ACTIONS[action].includes(key)) {
      activeActions[action] = false;
    }
  }
};
