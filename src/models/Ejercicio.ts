import { ZodSchema, z } from "zod";

export class Ejercicio {
    private muscleGroup: string
    private name: string

    /**
     * Creates a new Ejercicio instance.
     * @param muscleGroup The muscle group targeted by the exercise.
     * @param name The name of the exercise.
     */
    constructor(muscleGroup: string, name: string) {
        this.muscleGroup = muscleGroup;
        this.name = name;
    }
    
    /**
     * Zod schema for validating Ejercicio data.
     */
    public static schema: ZodSchema = z.object({
        muscleGroup: z.string(),
        name: z.string(),
    });
    
    /**
     * Checks if the provided data conforms to the Ejercicio schema.
     * @param unparsedData The data to validate.
     * @returns The parsed data if valid, throws an error otherwise.
     */
    static checkSchema(unparsedData: unknown): { muscleGroup: string, name: string } {
        return this.schema.parse(unparsedData);
    }

    /**
     * Gets the muscle group targeted by the exercise.
     * @returns The muscle group.
     */
    public getMuscleGroup(): string {
        return this.muscleGroup;
    }

    /**
     * Gets the name of the exercise.
     * @returns The name of the exercise.
     */
    public getName(): string {
        return this.name;
    }
}
