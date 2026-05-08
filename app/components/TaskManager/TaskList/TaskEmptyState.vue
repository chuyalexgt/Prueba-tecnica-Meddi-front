<script setup lang="ts">
import { SlidersHorizontal } from "lucide-vue-next";

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-black/10 bg-white/60 px-6 py-14 text-center"
  >
    <div
      class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4b8db]"
    >
      <SlidersHorizontal class="h-5 w-5 text-black" />
    </div>

    <h3 class="text-lg font-semibold text-black">
      {{ title ?? "No se encontraron tareas" }}
    </h3>

    <p class="mt-2 max-w-[260px] text-sm leading-relaxed text-black/40">
      {{
        description ??
        "Intenta cambiar los filtros o crea una nueva tarea."
      }}
    </p>
  </div>
</template>