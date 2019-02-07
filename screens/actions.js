const addAllDatas = (datas) => ({
  type: "ADD_ALL_DATAS",
  payload: datas,
});

const addName = (name) => ({
  type: "ADD_NAME",
  payload: name,
});

const addData = (data) => ({
  type: "ADD_DATA",
  payload: data,
});

const addWillDatas = (willDatas) => ({
  type: "ADD_WILL_DATA",
  payload: willDatas,
});

const reload = () => ({
  type: "RELOAD",
  payload: 1,
});

export const actions = {
  addAllDatas,
  addName,
  addData,
  addWillDatas,
  reload,
};