const userInfo = {
  state: () => ({
    userID: '',
    userName: '',
    userAvatar: '',
    token: '',
  }),
  getter: {},
  mutations: {
    setUserInfo(state, user) {
      typeof user.id !== 'undefined' ? state.userID = user.id : state.userID;
      typeof user.name !== 'undefined' ? state.userName = user.name : state.userName;
      typeof user.avatar !== 'undefined' ? state.userAvatar = user.avatar : state.userAvatar;
      typeof user.token !== 'undefined' ? state.token = user.token : state.token;
    }
  },
  actions: {},
}
export default userInfo;