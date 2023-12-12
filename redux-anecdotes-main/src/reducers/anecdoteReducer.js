const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    payload: {
      id: id,
    },
  };
};

export const filter = (str) => {
  return {
    type: "FILTER",
    payload: {
      str: str,
    },
  };
};

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "FILTER": {
      const str = action.payload.str;
      if (str === "") {
        return initialState;
      }
      const anecdotesFiltered = state.filter((anecdote) =>
        anecdote.content.includes(str)
      );
      return anecdotesFiltered;
    }
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      const newState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      newState.sort((a, b) =>
        b.votes > a.votes ? 1 : a.votes > b.votes ? -1 : 0
      );
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
