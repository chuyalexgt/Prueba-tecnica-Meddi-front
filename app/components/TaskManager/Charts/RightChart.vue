<!-- components/TaskManager/Charts/RightChart.vue -->

<script setup lang="ts">
import type {
  TaskStats,
} from "~/types/task.types";

const props = defineProps<{
  stats: TaskStats;
}>(); //definimos propiedades del componente, recibimos las stats

const maxValue = computed(() => {
  return Math.max(
    props.stats.byStatus.PENDING,
    props.stats.byStatus.COMPLETED,
    1,
  );
}); //obtenemos el valor maximos de tareas completed o pending, se reenderiza cada que cambian

const statusStats = computed(() => [
  {
    label: "Pendientes",
    //Value es el valor real
    value: props.stats.byStatus.PENDING,
    //Height se calcula dividiendo la cantidad de tasks en la prioridad entre el valor maximo de todas las prioridades. 
    //y lo multiplicamos por 84, que es el valor mas alto de pixeles que puede medir cada barra
    height: `${(props.stats.byStatus.PENDING / maxValue.value) * 84}px`,
    //Definimos el color
    color: "#111111",
  },

  {
    label: "Completadas",
    value: props.stats.byStatus.COMPLETED,
    height: `${(props.stats.byStatus.COMPLETED / maxValue.value) * 84}px`,
    color: "#e19cc2",
  },
]);
</script>

<template>
  <div
    class="flex h-45 w-[60%] flex-col justify-between rounded-4xl bg-[#f4b8db] p-6"
  >
    <div>
      <p class="text-sm font-medium text-black/50">
        Tareas por estado
      </p>

      <div
        class="mt-6 flex h-25 items-end justify-between gap-6"
      >
      <!-- renderizamos las bars-->
        <div
          v-for="item in statusStats"
          :key="item.label"
          class="flex flex-1 flex-col items-center gap-2"
        >
          <div
            class="relative flex w-full items-start justify-center rounded-[14px] transition-all duration-300"
            :style="{
              height: item.height,
              backgroundColor: item.color,
            }"
          >
            <span
              class="absolute -top-5 text-[11px] font-semibold text-black"
            >
              {{ item.value }}
            </span>
          </div>

          <span
            class="text-[11px] font-medium text-black/60"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>