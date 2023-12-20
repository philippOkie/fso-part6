import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";
import { useNotificationDispatch } from "../../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      dispatch({ type: "SHORT_CONTENT" });
      // console.log("content length should be at least 5");
      setTimeout(() => {
        dispatch({ type: "CLEAN" });
      }, 5000);
    }

    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "ADD" });
    setTimeout(() => {
      dispatch({ type: "CLEAN" });
    }, 5000);
    // console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
