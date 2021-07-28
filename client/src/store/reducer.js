const initilstate = {
  count: 0,
  items: {},
  cost: {},
};
const reducer = (state = initilstate, action) => {
  if (action.type === "INCREMENT") {
    let count = state.count + 1;
    let newitems = { ...state.items };
    let newcost = { ...state.cost };
    if (newitems[action.name]) {
      newitems[action.name] += 1;
      newcost[action.name] += 1*action.cost;
    } else {
      newitems[action.name] = 1;
      newcost[action.name] = 1*action.cost;
    }
    return {
      count,
      items: { ...newitems },
      cost: { ...newcost },
    };
  }
  if (action.type === "DECREMENT") {
    let count = state.count - 1;
    let newitems = { ...state.items };
    let newcost = { ...state.cost };
    newitems[action.name] -= 1;
    newcost[action.name] -= 1*action.cost;
    return {
      count,
      items: { ...newitems },
      cost: { ...newcost },
    };
  }
  return state;
};

export default reducer;
