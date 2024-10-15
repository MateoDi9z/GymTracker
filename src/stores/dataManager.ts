import { defineStore } from 'pinia'
import type { OptionalSerie } from "@/models/Serie"
import { User } from "@/models/User"
import { Serie } from "@/models/Serie"
import { Ejercicio } from "@/models/Ejercicio"
import { useFirebaseStore } from './firebase'

type State = {
    user: User,
    series: Serie[],
    exercises: Ejercicio[]

    formData: {
        loading: boolean,
        error: boolean,
        success: boolean,
        feedback: string,
    }

    addSerieForm: OptionalSerie
}

export const useDataManager = defineStore('data',  {
    state: (): State => {
        return {
            user: new User(1, "Mateo"),
            series: [],
            exercises: [],
            

            formData: {
                loading: false,
                error: false,
                success: false,
                feedback: "",
            },

            addSerieForm: {},
        }
    },

    actions: {
        async fetchSeries() {
            this.formData.loading = true
            const fb = useFirebaseStore()
            this.series = await fb.Repetitions.get(this.user) 
            this.formData.loading = false    
        },

        async fetchExercises() {
            this.formData.loading = true
            const fb = useFirebaseStore()
            this.exercises = await fb.Ejercicios.get()
            this.formData.loading = false
        },

        setForm(newForm: OptionalSerie) {
            this.addSerieForm = newForm
        },

        addSerie() {
            this.formData.loading = true

            const valid = Serie.checkSchema(this.addSerieForm)
            
            if (!valid) {
                this.formData.error = true
                this.formData.feedback = "Invalid data."
                return
            }

            this.formData.loading = false
            this.formData.success = true
        }
    },

    getters: {
        getUser: (state) => state.user,
        getExercises: (state) => state.exercises,
        getExercisesOrdered: (state) => {
            const texts: string[] = []
            state.exercises.forEach((x) => texts.push(`${x.getMuscleGroup()} - ${x.getName()}`))
            return texts.sort()
        },
        getFormData: (state) => state.formData
    }
})