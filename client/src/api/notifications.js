import { notificationAxios } from './axios';

export const notificationAPI = {
  // Get all notifications
  getNotifications: async () => {
    const response = await notificationAxios.get('/notifications');
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await notificationAxios.get('/notifications/unread/count');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await notificationAxios.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await notificationAxios.patch('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await notificationAxios.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};

export default notificationAPI;
