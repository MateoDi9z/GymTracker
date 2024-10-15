import { z } from "zod"

export type OptionalSerie = {
    id?: number
    datetime?: Date
    repetitions?: number
    ejercicioName?: string
    userId?: number
}

export class Serie {
    id: number
    datetime: Date
    repetitions: number
    ejercicioName: string
    userId: number
    
    static idCounter: number = 0;

    constructor(id: number, datetime: Date, repetitions: number, ejercicioName: string, userId: number) {
        this.id = id
        this.datetime = datetime
        this.repetitions = repetitions
        this.ejercicioName = ejercicioName
        this.userId = userId
    }
    
    static schema =  z.object({
        id: z.number(),
        datetime: z.preprocess((arg) => {
          if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
        }, z.date()), // Verifica que sea una fecha válida
        repetitions: z.number(),
        ejercicioName: z.string(), // Incluye el esquema de Ejercicio
        userId: z.number(),           // Incluye el esquema de User
      });

    static checkSchema(unparsedData: unknown) {
        return this.schema.parse(unparsedData)
    }

    static validate(form: OptionalSerie): boolean {
        if (!form.datetime) return false
        if (!form.ejercicioName) return false
        if (!form.id) return false
        if (!form.userId) return false
        return true
    }
}