import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = () => {
  const activities = [
  {
    id: 1,
    type: "alert",
    title: "High-risk transaction blocked",
    description: "Transaction of $12,450 from suspicious IP address",
    user: "System Automated",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10317ebdd-1765366616436.png",
    avatarAlt: "AI system icon with blue circuit pattern on dark background representing automated fraud detection",
    timestamp: "3 minutes ago",
    icon: "ShieldAlert",
    iconColor: "bg-error"
  },
  {
    id: 2,
    type: "investigation",
    title: "Case #FR-2847 resolved",
    description: "False positive confirmed, account reinstated",
    user: "Sarah Mitchell",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10df5a971-1765003957966.png",
    avatarAlt: "Professional woman with brown hair in business attire smiling at camera in office setting",
    timestamp: "12 minutes ago",
    icon: "CheckCircle2",
    iconColor: "bg-success"
  },
  {
    id: 3,
    type: "rule",
    title: "Detection rule updated",
    description: "Velocity check threshold adjusted to 8 transactions/hour",
    user: "Marcus Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ede8054b-1764653670188.png",
    avatarAlt: "Asian man with glasses wearing blue shirt working on laptop in modern office",
    timestamp: "28 minutes ago",
    icon: "Settings",
    iconColor: "bg-accent"
  },
  {
    id: 4,
    type: "alert",
    title: "Account takeover prevented",
    description: "Blocked login attempt from unrecognized device",
    user: "System Automated",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10317ebdd-1765366616436.png",
    avatarAlt: "AI system icon with blue circuit pattern on dark background representing automated fraud detection",
    timestamp: "45 minutes ago",
    icon: "Lock",
    iconColor: "bg-warning"
  },
  {
    id: 5,
    type: "investigation",
    title: "Manual review completed",
    description: "Transaction approved after customer verification",
    user: "Emily Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b26ed7d2-1763293513901.png",
    avatarAlt: "Hispanic woman with long dark hair in professional blazer reviewing documents at desk",
    timestamp: "1 hour ago",
    icon: "UserCheck",
    iconColor: "bg-success"
  },
  {
    id: 6,
    type: "system",
    title: "ML model retrained",
    description: "Detection accuracy improved to 98.7%",
    user: "System Automated",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10317ebdd-1765366616436.png",
    avatarAlt: "AI system icon with blue circuit pattern on dark background representing automated fraud detection",
    timestamp: "2 hours ago",
    icon: "Cpu",
    iconColor: "bg-primary"
  }];


  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">Recent Activity</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Latest system events and actions</p>
        </div>
        <button className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
          View All →
        </button>
      </div>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {activities?.map((activity, index) =>
        <div key={activity?.id} className="relative">
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300">
              <div className="relative flex-shrink-0">
                <Image
                src={activity?.avatar}
                alt={activity?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${activity?.iconColor} flex items-center justify-center border-2 border-card`}>
                  <Icon name={activity?.icon} size={12} color="var(--color-foreground)" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{activity?.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity?.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{activity?.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">by</span>
                  <span className="text-xs font-medium text-foreground">{activity?.user}</span>
                </div>
              </div>
            </div>

            {index < activities?.length - 1 &&
          <div className="ml-5 h-4 w-px bg-border" />
          }
          </div>
        )}
      </div>
    </div>);

};

export default RecentActivity;