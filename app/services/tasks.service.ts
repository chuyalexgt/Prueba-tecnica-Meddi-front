import type {
  Task,
  TaskQuery,
  TaskStats,
  GroupedTasks,
} from "~/types/task.types";

const API_URL = "http://localhost:8000/tasks";

export const tasksService = {
  // Obtener todas las tasks
  async getAll(query?: TaskQuery): Promise<Task[]> {
    return $fetch<Task[]>(API_URL, {
      query,
    });
  },

  // Obtener task por id
  async getById(id: string): Promise<Task> {
    return $fetch<Task>(
      `${API_URL}/${id}`,
    );
  },

  // Crear task
  async create(data: Partial<Task>): Promise<Task> {
    return $fetch<Task>(API_URL, {
      method: "POST",
      body: data,
    });
  },

  // Actualizar task
  async update(
    id: string,
    data: Partial<Task>,
  ): Promise<Task> {
    return $fetch<Task>(
      `${API_URL}/${id}`,
      {
        method: "PUT",
        body: data,
      },
    );
  },

  // Eliminar task
  async delete(
    id: string,
  ): Promise<{ message: string }> {
    return $fetch<{ message: string }>(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
      },
    );
  },

  // Obtener tasks agrupadas por prioridad
  async getGroupedByPriority(): Promise<GroupedTasks> {
    return $fetch<GroupedTasks>(
      `${API_URL}/grouped-by-priority`,
    );
  },

  // Obtener estadísticas
  async getStats(): Promise<TaskStats> {
    return $fetch<TaskStats>(
      `${API_URL}/stats`,
    );
  },
};