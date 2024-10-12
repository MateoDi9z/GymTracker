import { Ejercicio } from "./Ejercicio"
import { User } from "./User"

export type OptionalSerie = {
    id?: number
    datetime?: Date
    repetitions?: number
    ejercicio?: Ejercicio
    user?: User
}

export class Serie {
    id: number
    datetime: Date
    repetitions: number
    ejercicio: Ejercicio
    user: User
    
    constructor(id: number, datetime: Date, repetitions: number, ejercicio: Ejercicio, user: User) {
        this.id = id
        this.datetime = datetime
        this.repetitions = repetitions
        this.ejercicio = ejercicio
        this.user = user
    }

    static validate(form: OptionalSerie): boolean {
        if (!form.datetime) return false
        if (!form.ejercicio) return false
        if (!form.id) return false
        if (!form.user) return false
        return true
    }
}