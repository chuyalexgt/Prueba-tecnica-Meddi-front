<script setup lang="ts">
import type { TaskStats } from "~/types/task.types";

import { tasksService } from "~/services/tasks.service";

//Creamos el estado de estadisticas, traemos el type de como van a llegar las estadisticas
const stats = ref<TaskStats | null>(null);

//Hacemos la peticion de las estadisticas
async function fetchStats() {
  try {
    stats.value = await tasksService.getStats();
  } catch (error) {
    console.error(error);
  }
}

//hacemos la peticion de las estadisticas ya que se renderizo el componente
onMounted(() => {
  fetchStats();
});
</script>

<template>
  <!-- Usamos flex para dividir en dos rows y dos columnas. Cada chart recibe las estadisticas y las muestra -->
  <div class="mt-6 flex flex-col gap-4">
    <!-- Primera row-->
    <div class="flex gap-4">
      <!-- 40% -->
      <LeftChart v-if="stats" :stats="stats" />

      <!-- 60% -->
      <RightChart v-if="stats" :stats="stats" />
    </div>

    <!-- Segunda row -->
    <div class="flex gap-4">
      <!-- 50% -->
      <LeftBottomChart v-if="stats" :stats="stats" />

      <!-- 50% -->
      <RightBottomChart v-if="stats" :stats="stats" />
    </div>
  </div>
</template>
