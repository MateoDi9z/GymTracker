import api, { user } from '@/data/api'
import { defineStore } from 'pinia'
import type { OptionalSerie } from "@/models/Serie"
import { User } from "@/models/User"
import { Serie } from "@/models/Serie"
import { Ejercicio } from "@/models/Ejercicio"

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
            user: user,
            series: [],
            exercises: [],
            

            formData: {
                loading: false,
                error: false,
                success: false,
                feedback: "",
            },

            addSerieForm: {}
        }
    },

    actions: {
        fetchSeries() {
            this.series = api.Repetitions.get(this.user)
        },
        
        fetchExercises() {
            this.exercises = api.Exercises.get()
        },

        setForm(newForm: OptionalSerie) {
            this.addSerieForm = newForm
        },

        addSerie() {
            this.formData.loading = true

            const valid = Serie.validate(this.addSerieForm)
            
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
    }
})