<script setup lang="ts">
import type { Task } from "~/types/task.types";

import { Search } from "lucide-vue-next";

import { tasksService } from "~/services/tasks.service";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const props = defineProps<{
  placeholder?: string;
}>(); //definimos propiedades del componente, solamente recibe el placeholder

//Creamos el model para que el componente padre pueda comunicarse con el searchbar
const model = defineModel<string>();

//Creamos estado de carga
const loading = ref(false);

//Creamos el estado de tareas
const tasks = ref<Task[]>([]);

//estado para saber si esta abierto el contenido del searchbar
const open = ref(false);

//Funcion para traer las tareas usando el tasksService
async function searchTasks() {
  try {
    //Verifica si el modelo esta vacio, si esta vacio limpiamos todo y cerramos el popover
    if (!model.value?.trim()) {
      tasks.value = [];

      open.value = false;

      return;
    }
    //Comenzamos a cargar las tasks, el valor para mostrar que esta cargando se activa
    loading.value = true;

    //Obtenemos las tasks solamente si el input no esta vacio con el filtro de search para obtener por nombre las tasks
    const response = await tasksService.getAll({
      search: model.value,
    });

    //Guardamos las tasks en el estado para luego mostrarlas en el contenido del searchbar
    tasks.value = response;

    //Abrimos el contenido del searchbar
    open.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    //siempre se ejecuta, dejamos de mostrar el loading
    loading.value = false;
  }
}
//observador en el model, cada que cambia volvemos a ejecutar el searchtask. 
//Esto hace que se haga la busqueda cada que modificamos el input
watch(model, () => {
  searchTasks();
});
</script>

<template>
  <Popover :open="open">
    <PopoverTrigger as-child>
      <div class="flex items-center gap-2">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4b8db]"
        >
          <Search class="h-5 w-5 text-black" />
        </div>
        <div
          class="flex h-11 flex-1 items-center rounded-xl border border-black/50 bg-transparent px-4"
        >
        <!-- definimos el input como el modelo -->
          <input
            v-model="model"
            :placeholder="props.placeholder ?? 'Buscar tareas'"
            class="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
          />
        </div>
      </div>
    </PopoverTrigger>
    <!-- Si open es true mostramos el popover con el contenido de las tasks -->
    <PopoverContent
      align="start"
      class="mt-2 w-100 rounded-2xl border-black/10 bg-white p-2"
    >
      <!-- Mostramos resultados de la busqueda, recibe las tasks y el estado de loading para manejarlo -->
      <TaskSearchResults :tasks="tasks" :loading="loading" />
    </PopoverContent>
  </Popover>
</template>
