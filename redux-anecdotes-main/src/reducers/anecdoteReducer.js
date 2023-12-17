import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (content) => {
        return {
          payload: {
            content,
            id: getId(),
            votes: 0,
          },
        };
      },
    },
    vote: (state, action) => {
      const anecdoteToChange = state.find((a) => a.id === action.payload);
      anecdoteToChange.votes += 1;
      state.sort((a, b) =>
        b.votes > a.votes ? 1 : a.votes > b.votes ? -1 : 0
      );
    },
    filter: (state, action) => {
      if (action.payload === "") {
        return state;
      }
      return state.filter((anecdote) =>
        anecdote.content.includes(action.payload)
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { createAnecdote, vote, filter, notification, appendAnecdote } =
  anecdotesSlice.actions;

export default anecdotesSlice.reducer;
