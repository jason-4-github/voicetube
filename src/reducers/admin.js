const admin = (state = {}, action) => {
  switch(action.type) {
    case "FETCH_VIDEO_REQUEST":
    case "FETCH_VIDEO_SCCUESS":
    case "FETCH_VIDEO_FAILURE":
      return {
        ...state,
        ...action,
      }
    default:
      return {
        ...state,
        ...action,
      }
  }
};

export default admin;