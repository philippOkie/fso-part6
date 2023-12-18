import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const onClickVote = async (id, content) => {
    console.log("vote", id);

    await anecdoteService.updateVotes(id);
    dispatch(vote(id));
    dispatch(notify(`You voted for anecdote ${content}`, 10));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onClickVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
