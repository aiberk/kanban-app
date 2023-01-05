// // import User from "../models/UserModel.js";
// const User = require("../models/UserModel.js");

// module.exports = getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// module.exports = saveUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const inserteduser = await user.save();
//     res.status(201).json(inserteduser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = updateUser = async (req, res) => {
//   try {
//     const updateduser = await User.updateOne(
//       { _id: req.params.id },
//       { $set: req.body }
//     );
//     res.status(200).json(updateduser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = deleteUser = async (req, res) => {
//   try {
//     const deleteduser = await User.deleteOne({ _id: req.params.id });
//     res.status(200).json(deleteduser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
