const initialState = {
  datas: [],
  dataItem: null,
  data: null,
  willDatas: [],
  re: 0,
  add: 0,
  image: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ALL_DATAS":
      return { ...state, datas: action.payload };
    case "ADD_NAME":
      return { ...state, dataItem: action.payload };
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "ADD_WILL_DATA":
      return { ...state, willDatas: action.payload };
    case "RELOAD":
      return { ...state, re: state.re + action.payload };
    case "RELOAD-2":
      return { ...state, add: state.add + action.payload };
    case "ADD_PHOTO":
      return { ...state, image: action.payload };
    case "ADD_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};