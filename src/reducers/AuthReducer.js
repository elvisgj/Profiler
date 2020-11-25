import { USER_TOKEN_KEY } from "../keys";

const AuthReducer = (
  state = { accessToken: "", refreshToken: "", isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case "LOGGED": {
      if (action.payload === undefined) {
        return state;
      } else {
        localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(action.payload));
        return {
          isAuthenticated: true,
          accessToken: action.payload.access_token,
          refreshToken: action.payload.refresh_token,
        };
      }
    }
    case "LOGOUT": {
      localStorage.removeItem(USER_TOKEN_KEY);
      return {
        isAuthenticated: false,
        access_token: "",
        refresh_token: "",
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
