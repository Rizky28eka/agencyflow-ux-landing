
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    user: { name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    action: 'commented on your task',
    target: '"Finalize Q3 Report"',
    time: '5m ago',
    read: false,
  },
  {
    id: 2,
    user: { name: 'Project Sentinel' },
    action: 'detected a risk in',
    target: 'Project Phoenix',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    user: { name: 'Bob Williams' },
    action: 'assigned you a new task',
    target: '"Design new landing page mockups"',
    time: '3h ago',
    read: true,
  },
    {
    id: 4,
    user: { name: 'System' },
    action: 'sent a billing reminder for',
    target: 'Invoice #INV-2024-002',
    time: '1d ago',
    read: true,
  },
];

export const NotificationList = () => {
  return (
    <div className="w-80">
      <div className="p-4 border-b">
        <h4 className="font-semibold">Notifications</h4>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className={`p-4 border-b flex items-start gap-4 ${!notification.read ? 'bg-blue-50/50' : ''}`}>
            {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.user.name}</span> {notification.action} <span className="font-semibold text-primary">{notification.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 text-center border-t">
        <Button variant="link" size="sm">View all notifications</Button>
      </div>
    </div>
  );
};
