<!-- TaskCalendar.vue -->

<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

import { Calendar } from "@/components/ui/calendar";

//definimos el modelo, para poder comunicar con el componente padre la fecha
const modelValue = defineModel<string>({
  required: true,
});

//Creamos estado de la fecha
const internalDate = ref();

watch(
  //Observador para detectar cambios en la fecha seleccionada del calendario
  internalDate,
  (value: any) => {
    if (!value) {
      return;
    }

    //Convertimos la fecha del calendario a un objeto Date
    const jsDate = new Date(
      value.year,
      value.month - 1,
      value.day +1,
    );

    //Convertimos la fecha a formato YYYY-MM-DD
    modelValue.value =
      jsDate.toISOString().split("T")[0] || "";
  },
  {
    immediate: true, //inmediatamente al renderizal el componente
  },
);

//Creamos la fecha actual si no existe
const currentDate = computed(() => {
  return modelValue.value
    ? new Date(modelValue.value)
    : new Date();
});

//creamos el mes formateado a espanol mexico
const formattedMonth = computed(() => {
  return currentDate.value.toLocaleDateString(
    "es-MX",
    {
      month: "long",
      year: "numeric",
    },
  );
});

//Regresar al mes anterior, creamos objeto date un mes anterior
const previousMonth = () => {
  const newDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1,
  );

  //Actualizamos la fecha seleccionada.
  modelValue.value =
    newDate.toISOString().split("T")[0] || "";
};

//Avanzamos al siguiente mes, sumamos un mes
const nextMonth = () => {
  const newDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1,
  );

  modelValue.value =
    newDate.toISOString().split("T")[0] || "";
};
</script>

<template>
  <div class="rounded-3xl bg-[#faf5e3] p-6">
    <div class="mb-4 flex items-center justify-between">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5"
        @click="previousMonth"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>

      <div
        class="rounded-full bg-[#f4b8db] px-4 py-1 text-sm font-medium capitalize"
      >
        {{ formattedMonth }}
      </div>

      <button
        class="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5"
        @click="nextMonth"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>

    <!--Calendario de shadcn-->
    <Calendar
      v-model="internalDate"
      class="rounded-2xl border-none bg-transparent"
    />
  </div>
</template>