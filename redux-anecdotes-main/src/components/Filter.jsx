import { useDispatch } from "react-redux";
import { filter } from "../reducers/anecdoteReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(filter(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <p>
        filter <input onChange={handleChange} />
      </p>
    </div>
  );
};

export default Filter;
