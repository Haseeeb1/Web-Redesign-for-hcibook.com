const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
