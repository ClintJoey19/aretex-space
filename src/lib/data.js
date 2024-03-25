import { connect } from "./connection";
import { User } from "./models";

export const getUsers = async () => {
  try {
    connect();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id) => {
  try {
    connect();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};
