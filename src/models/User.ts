import { z } from "zod";

export class User {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    static schema = z.object({
        id: z.number(),
        name: z.string(),
    });

    static checkSchema(unparsedData: unknown) {
        return this.schema.parse(unparsedData)
    }

    public getId(): number {
        return this.id
    }

    public getName(): string {
        return this.name
    }
}