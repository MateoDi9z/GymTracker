<script lang="ts" setup>
import { useDataManager } from '@/stores/dataManager';
import { ClipboardDocumentListIcon, NumberedListIcon, ScaleIcon } from '@heroicons/vue/24/solid'
import { reactive} from 'vue';

const data = reactive({
    date: null,
    exercise: null,
    reps: null,
    weight: null,
})

const store = useDataManager()

if (!store.getExercises.length) {
    store.fetchExercises()
}
</script>

<template>
    <div class="wrapper flex flex-col gap-4 px-5 box">
        <h1 class="text-xl pt-5 text-primary tracking-wide">Registrar Serie:</h1>
        <hr class="border-secondary" />

        <div class="flex flex-col gap-4 px-5 box" v-if="!store.getFormData.loading">
            <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Tipo de ejercicio</span>
                <span class="label-text-alt">Crear uno</span>
            </div>
            <select class="select select-bordered capitalize">
                <option disabled selected>
                    ejercicio
                </option>
                <option v-for="ex in store.getExercisesOrdered">
                    {{ ex }}
                </option>
            </select>
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <input type="date" class="grow" placeholder="Fecha" v-model="data.date" />
        </label>

        <label class="input input-bordered flex items-center gap-2">
            <NumberedListIcon class="h-5" />

            <input type="number" class="grow" placeholder="Repeticiones" min="0" v-model="data.reps" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
            <ScaleIcon class="h-5" />

            <input type="number" class="grow" placeholder="Peso" min="0" v-model="data.weight" />
            <span class="">kg</span>
        </label>

        <button class="btn btn-primary">Submit</button>

        </div>

        <div v-else class="w-full flex justify-center">
            <span class="loading loading-dots loading-lg text-primary mt-10"></span>
        </div>
     </div>
</template>

<style>
@media (min-width: 1024px) {
    .box {
        min-height: 100vh;
    }
}
</style>