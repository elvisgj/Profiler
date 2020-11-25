export const logged = (auth) => {
  return {
    type: "LOGGED",
    payload: auth,
  };
};

export const loggedOut = () => {
  return {
    type: "LOGOUT",
  };
};
