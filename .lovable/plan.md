# Shared admin notifications

## Build
- Add a notification composer in the hidden Admin Panel for a title, message, and optional destination link, with publish and delete controls.
- Store published announcements in Lovable Cloud so all visitors see the same updates in the Home notification bell; show recent items newest-first and handle empty/loading/error states.
- Protect publishing and deletion with a Cloud-authenticated admin role checked on the server. Keep public access read-only; the current device-only login cannot authorize shared writes safely.

## Technical details
- Add a `public.notifications` table with explicit grants and RLS: anonymous read of published notices only; admin-only authenticated writes.
- Add role-based server functions for publishing/deleting, and a public read path that returns only announcement fields.
- Update the bell to load and display shared notifications, replacing hard-coded announcements.
- Do not send push notifications or emails; this feature is an in-app announcement feed.
