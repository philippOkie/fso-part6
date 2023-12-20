import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return `you added an anecdote`;
    case "VOTE":
      return `you voted for an anecdote: ${action.payload}`;
    case "CLEAN":
      return "";
    case "SHORT_CONTENT":
      return "content should contain at least 5 symbols";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
