<script setup lang="ts">
import type {
  Task,
} from "~/types/task.types";
//Definimos las propiedades del componente, se pasan de Tasksearchbar
defineProps<{
  tasks: Task[]; //lista de tasks
  loading?: boolean; //estado de carga
}>();
</script>

<template>
  <!-- Si loading es true mostramos Buscando tareas.. -->
  <div
    v-if="loading"
    class="px-3 py-6 text-center text-sm text-black/40"
  >
    Buscando tareas...
  </div>

  <!-- Si hay tareas encontradas las mostramos-->
  <div
    v-else-if="tasks.length"
    class="space-y-1"
  >
  <!-- Cada tarea redirige a editarla -->
    <button
      v-for="task in tasks"
      :key="task._id"
      class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-black/5"
      @click="navigateTo(`/taskManager/edit/${task._id}`)"
    >
      <div>
        <p class="text-sm font-medium text-black">
          {{ task.title }}
        </p>

        <p
          v-if="task.description"
          class="text-xs text-black/40"
        >
          {{ task.description }}
        </p>
      </div>

      <div
        class="rounded-full bg-black px-2 py-1 text-[10px] font-medium text-white"
      >
        {{ task.priority }}
      </div>
    </button>
  </div>

  <!-- Si no se encuentran tareas mostramos un empty state -->
  <div
    v-else
    class="px-3 py-6 text-center"
  >
    <p class="text-sm font-medium text-black">
      No se encontraron tareas
    </p>

    <p class="mt-1 text-xs text-black/40">
      Intenta con otro nombre
    </p>
  </div>
</template>