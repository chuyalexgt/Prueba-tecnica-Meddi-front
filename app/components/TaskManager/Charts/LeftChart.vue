<script setup lang="ts">
import type {
  TaskStats,
} from "~/types/task.types";

//Definimos las propiedades del componente, las recibe de TaskStats
const props = defineProps<{
  stats: TaskStats;
}>();

//Computed es para un valor reactivo, hace que se recalcule automáticamente si cambian las estadisticas
const maxValue = computed(() => {
  //Encontramos el maximo de prioridad, cual tiene mas tareas.
  return Math.max(
    props.stats.byPriority.LOW,
    props.stats.byPriority.MEDIUM,
    props.stats.byPriority.HIGH,
    1,
  );
});

//Esto es simplemente para poder ponerles color y una estructura a las estadisticas
const priorityStats = computed(() => [
  {
    label: "Baja",
    //Value es el valor real
    value: props.stats.byPriority.LOW,
    //Height se calcula dividiendo la cantidad de tasks en la prioridad entre el valor maximo de todas las prioridades. 
    //y lo multiplicamos por 84, que es el valor mas alto de pixeles que puede medir cada barra
    height: `${(props.stats.byPriority.LOW / maxValue.value) * 84}px`,
    //Definimos el color
    color: "#e7c84d",
  },

  {
    label: "Media",
    value: props.stats.byPriority.MEDIUM,
    height: `${(props.stats.byPriority.MEDIUM / maxValue.value) * 84}px`,
    color: "#111111",
  },

  {
    label: "Alta",
    value: props.stats.byPriority.HIGH,
    height: `${(props.stats.byPriority.HIGH / maxValue.value) * 84}px`,
    color: "#e7c84d",
  },
]);
</script>

<template>
  <div
    class="flex h-45 w-[40%] flex-col justify-between rounded-4xl bg-[#f7d568] p-6"
  >
    <div>
      <p class="text-sm font-medium text-black/50">
        Tareas por prioridad
      </p>

      <div
        class="mt-6 flex h-25 items-end justify-between gap-4"
      >
      <!-- renderizamos las bars-->
        <div
          v-for="item in priorityStats"
          :key="item.label"
          class="flex flex-1 flex-col items-center gap-2"
        >
          <div
            class="relative flex w-full items-start justify-center rounded-[12px] transition-all duration-300"
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