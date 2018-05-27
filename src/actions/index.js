const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) return response;

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const parseJSON = (response) => {
  return response.json();
}

export const fetchVideoApi = () => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_VIDEO_REQUEST",
    });
    fetch(`https://us-central1-lithe-window-713.cloudfunctions.net/fronted-demo`, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((videos) => {
      dispatch({
        type: "FETCH_VIDEO_SCCUESS",
        videos: videos.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "FETCH_VIDEO_FAILURE",
        message: err,
      });
    });
  }
}