export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export interface NotificationResponse {
  notifications: Notification[];
}

export type NotificationTypeFilter = "All" | "Placement" | "Result" | "Event";
