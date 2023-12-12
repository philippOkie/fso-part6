export const filter = (str) => {
  return {
    type: "FILTER",
    payload: {
      str: str,
    },
  };
};

const initialFilter = "";

export const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload.str;
    default:
      return state;
  }
};
export default filterReducer;
