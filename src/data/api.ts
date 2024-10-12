import { User } from "@/models/User"
import { Ejercicio } from "@/models/Ejercicio"
import { Serie } from "@/models/Serie"

export const user = new User(0, "Mateo")

const localEjercicios = [
    new Ejercicio("Pecho", "bench press"),
    new Ejercicio("Brazo", "bicep curls"),
    new Ejercicio("Piernas", "leg press")
]

const localReps = [
    new Serie(1, new Date(), 10, localEjercicios[0], user),
    new Serie(2, new Date(), 10, localEjercicios[1], user),
    new Serie(3, new Date(), 10, localEjercicios[2], user)
]

export default {
    Repetitions: {
        get: (user: User): Serie[] => {
            return localReps.filter((el) => el.user.id == user.id)
        }
    },

    Exercises: {
        get: (): Ejercicio[] => {
            return localEjercicios
        }
    }
}