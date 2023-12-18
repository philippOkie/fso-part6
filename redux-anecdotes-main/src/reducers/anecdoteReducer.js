import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
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

export const { vote, filter, notification, appendAnecdote } =
  anecdotesSlice.actions;

export default anecdotesSlice.reducer;
