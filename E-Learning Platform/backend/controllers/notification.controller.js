import Notification from "../models/Notification.model.js";

// Get all notifications for the logged-in user
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications" });
  }
};

// Mark a single notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Marked as read",
      data: notification,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete notification" });
  }
};
