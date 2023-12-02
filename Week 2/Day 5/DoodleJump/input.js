const ACTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
  JUMP: "jump",
};

const POSSIBLE_CODE_FOR_ACTIONS = {
  [ACTIONS.UP]: ["KeyW", "ArrowUp"],
  [ACTIONS.DOWN]: ["KeyS", "ArrowDown"],
  [ACTIONS.LEFT]: ["KeyA", "ArrowLeft"],
  [ACTIONS.RIGHT]: ["KeyD", "ArrowRight"],
  [ACTIONS.JUMP]: ["Space"],
};
// const ALL_ACTIONS = Object.values(ACTIONS).flat();

const activeActions = {
  [ACTIONS.UP]: false,
  [ACTIONS.DOWN]: false,
  [ACTIONS.LEFT]: false,
  [ACTIONS.RIGHT]: false,
  [ACTIONS.JUMP]: false,
};

function handleKeyDownOrUpState(code, state) {
  for (const action in POSSIBLE_CODE_FOR_ACTIONS) {
    if (POSSIBLE_CODE_FOR_ACTIONS[action].includes(code)) {
      activeActions[action] = state;
    }
  }
}

window.onkeydown = (e) => {
  handleKeyDownOrUpState(e.code, true);
};

window.onkeyup = (e) => {
  handleKeyDownOrUpState(e.code, false);
};
