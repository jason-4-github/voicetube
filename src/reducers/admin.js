const admin = (state = {}, action) => {
  switch(action.type) {
    default:
      return {
        ...state,
        ...action,
      }
  }
};

export default admin;