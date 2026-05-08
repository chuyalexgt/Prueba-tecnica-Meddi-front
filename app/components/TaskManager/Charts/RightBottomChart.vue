<!-- components/TaskManager/Charts/RightBottomChart.vue -->

<script setup lang="ts">
import type {
  TaskStats,
} from "~/types/task.types";

import { translateDay } from "~/lib/utils";

//Definimos las propiedades del componente, las recibe de TaskStats
const props = defineProps<{
  stats: TaskStats;
}>();

//Obtenemos solamente los primeros 3 dias con mayor cantidad de tareas completadas
const topCompletedDays = computed(() => {
  //Traducimos los dias con map
  return props.stats.topCompletedDays.slice(0, 3).map(item => ({
      ...item,
      day: translateDay(item.day),
    }));;
});
</script>

<template>
  <div
    class="flex h-27 w-1/2 flex-col justify-between rounded-4xl bg-[#b5caee] p-5"
  >
    <div>
      <p class="text-sm font-medium text-black/50">
        Días con más tareas completadas
      </p>

      <div class="mt-3 flex flex-wrap items-center gap-2">
        <!--Recorremos el arreglo de topCreatedDays, obtenemos su indice (para el ranking) y las mostramos-->
        <div
          v-for="(item, index) in topCompletedDays"
          :key="item.day"
          class="flex items-center gap-2 rounded-full bg-white/50 px-2 py-1"
        >
          <span
            class="text-[10px] font-semibold text-black/40"
          >
            #{{ index + 1 }}
          </span>

          <span
            class="text-[11px] font-semibold text-black"
          >
            {{ item.day }}
          </span>

          <span
            class="text-[10px] font-medium text-black/50"
          >
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>

    <div class="text-xs font-medium text-black/60">
      Basado en tareas finalizadas
    </div>
  </div>
</template>