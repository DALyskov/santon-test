import { Store } from "../common/store/store";
import { Registry } from "../common/store/registry";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

const UsersStore = new Store("users", {
  data: {
    activUser: null,
    users: [],
  },
  options: {
    shouldInitFromState: true,
    stateKey: "users",
  },
  reducers: [
    {
      type: ADD_USER,
      action(state, payload) {
        const { user } = payload;
        const activUser = user.id;
        const users = [...state.users, user];

        return {
          ...state,
          activUser,
          users,
        };
      },
    },
    {
      type: REMOVE_USER,
      action(state, payload) {
        const { id } = payload;
        const users = [...state.users];
        const index = users.findIndex((user) => user.id === id);

        if (index !== -1) {
          users.splice(index, 1);
        }

        return {
          ...state,
          activUser: null,
          users,
        };
      },
    },
  ],
});

Registry.addStore(UsersStore);

export { UsersStore };
