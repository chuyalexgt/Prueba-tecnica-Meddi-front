export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "PENDING" | "COMPLETED";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskQuery = {
  priority?: Priority;
  search?: string;
  startDate?: string;
  endDate?: string;
  sort?: "asc" | "desc";
};

export type TaskStats = {
  byPriority: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
  };

  byStatus: {
    PENDING: number;
    COMPLETED: number;
  };

  topCreatedDays: {
    day: string;
    count: number;
  }[];

  topCompletedDays: {
    day: string;
    count: number;
  }[];
};

export type GroupedTasks = {
  LOW: Task[];
  MEDIUM: Task[];
  HIGH: Task[];
};
