const Notification = require("../models/Notification");

// Get all notifications for the authenticated user
exports.getNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    // Seed default starter alerts if empty
    if (notifications.length === 0) {
      const defaultAlerts = [
        {
          user: req.user.id,
          title: "National Hackathon 2026 Alert 🚀",
          message: "Registrations are open for Smart India Hackathon & IEEE DevJam!",
          type: "hackathon",
          link: "https://innovateindia.mygov.in/",
        },
        {
          user: req.user.id,
          title: "Weekly Knowledge Quiz Live 🧠",
          message: "New React & Node.js challenges have been added to your Quiz zone.",
          type: "quiz",
          link: "/quiz",
        },
        {
          user: req.user.id,
          title: "Study Group Invitation 👥",
          message: "You have been invited to join the 'Full Stack MERN Builders' room.",
          type: "group",
          link: "/groups",
        },
        {
          user: req.user.id,
          title: "AI Project Competition 🏆",
          message: "All-India Student Innovation Challenge registration closes this week.",
          type: "competition",
          link: "https://unstop.com/",
        },
      ];
      notifications = await Notification.insertMany(defaultAlerts);
    }

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Mark single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// Mark all as read
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id }, { read: true });
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notifications" });
  }
};