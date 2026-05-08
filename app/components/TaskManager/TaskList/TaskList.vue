<script setup lang="ts">
import type {
  Task,
  TaskQuery,
  Priority,
  GroupedTasks,
} from "~/types/task.types";

import { tasksService } from "~/services/tasks.service";

//Creamos el estado de tasks, empieza siendo un arreglo de stasks vacias
const tasks = ref<Task[]>([]);

//Utilizamos el type de GriupedTasks para crear el estado, empieza en null porque inicialmente no hay tareas agrupadas
const groupedTasks = ref<GroupedTasks | null>(null);

//Estado para manejar la vista de la agrupacion de las tareas 
const isGrouped = ref(false);

//Objeto para guardar los filtros de busqueda, lo hacemos con el type de TaskQuery 
//y comienza mostrando las tareas de forma descendente
const filters = reactive<TaskQuery>({
  sort: "desc",
});

//Obtenemos las tareas seteamos isGrouped false, 
//para no obtener las tareas agrupadas y dejarlas de mostrar agrupadas
async function fetchTasks() {
  try {
    isGrouped.value = false;

    tasks.value = await tasksService.getAll(filters);
  } catch (error) {
    console.error(error);
  }
}

//Si isGrouped es true obtenemos las tareas agrupadas
async function fetchGroupedTasks() {
  try {
    isGrouped.value = true;

    groupedTasks.value = await tasksService.getGroupedByPriority();
  } catch (error) {
    console.error(error);
  }
}

//Manejo del estado del filtro, esta funcion cambia la prioridad del filtro de las tareas
function setPriority(priority?: Priority) {
  filters.priority = priority;

  fetchTasks();
}

//Manejo del estado del filtro, 
//esta funcion cambia a ascendente o descendente el filtro de las tareas
function setSort(sort: "asc" | "desc") {
  filters.sort = sort;

  fetchTasks();
}

//Despues de que el componente se renderiza, hacemos el fetch de las tareas
onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div class="mt-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-black">Tareas</h2>

        <p class="text-sm text-black/40">Organiza y visualiza tus tareas</p>
      </div>

      <div class="flex items-center gap-2">
        <!-- Boton del filtro del boton intercambia entre ver las tareas agrupadas o no -->
        <Button
          class="rounded-full bg-black text-white"
          @click="isGrouped ? fetchTasks() : fetchGroupedTasks()"
        >
          {{ isGrouped ? "Vista normal" : "Agrupar" }}
        </Button>

        <!-- Boton de filtros -->
        <TaskFilters :set-priority="setPriority" :set-sort="setSort" />
      </div>
    </div>

    <!-- Si isGrouped es true mostramos la task list pero de manera agrupada -->
    <TaskGroupedList v-if="isGrouped && groupedTasks" :tasks="groupedTasks" @deleted="fetchGroupedTasks" />

    <!-- Si hay tareas las mostramos -->
    <div v-else-if="tasks.length" class="space-y-2">
      <TaskCard v-for="task in tasks" :key="task._id" :task="task" @deleted="fetchTasks" />
    </div>

    <!-- Si no hay tareas mostramos un empty state -->
    <TaskEmptyState
      v-else
      title="No hay tareas"
      description="Crea una nueva tarea para comenzar."
    />
  </div>
</template>
