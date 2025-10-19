import User from '../models/User.js';

export default class UserController {
  static async list(req, res) {
    console.log("UserController.js list is called");
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async deleteById(req, res) {
    console.log("calling deleteById user");
    console.log("Incoming deleteById data:", "id:", req.params.id);

    try {
      const user = await User.delete(req.params.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        message: "User deleted successfully",
        user,
      });
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
}
