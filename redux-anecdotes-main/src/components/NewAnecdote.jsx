import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;

    e.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created ${content}`));
    setInterval(() => {
      dispatch(removeNotification());
    }, 10000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
