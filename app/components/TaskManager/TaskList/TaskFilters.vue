<!-- components/TaskManager/TaskFilters.vue -->

<script setup lang="ts">
import type {
  Priority,
} from "~/types/task.types";

import {
  SlidersHorizontal,
} from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

//Definimos las propiedades del componente, recibe dos funciones, simplemente para cambiar en el componente padre los filtros
defineProps<{
  setPriority: (priority?: Priority) => void;
  setSort: (sort: "asc" | "desc") => void;
}>();
</script>

<template>
  <!--Utilizamos un dropdownmenu para mostrar los filtros-->
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="rounded-full border-black/10 bg-white text-black"
      >
        <SlidersHorizontal class="mr-2 h-4 w-4" />

        Filtros
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      class="w-56 rounded-2xl"
    >
      <DropdownMenuLabel>
        Prioridad
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        @click="setPriority(undefined)"
      >
        Todas
      </DropdownMenuItem>
      <!--Usamos la funcion padre para setear el filtro de prioridad-->
      <DropdownMenuItem
        @click="setPriority('HIGH')"
      >
        Alta
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="setPriority('MEDIUM')"
      >
        Media
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="setPriority('LOW')"
      >
        Baja
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuLabel>
        Orden
      </DropdownMenuLabel>

      <DropdownMenuSeparator />
      <!--Usamos la funcion padre para setear el filtro de por fecha asc o desc-->
      <DropdownMenuItem
        @click="setSort('asc')"
      >
        Fecha ascendente
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="setSort('desc')"
      >
        Fecha descendente
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>