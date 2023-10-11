export interface TodoInterface {
    id: string;
    title: string;
    completed: boolean;
}
export class Todo {

    public id!: string;
    public title!: string;
    public completed!: boolean;

    constructor() { }
    generate(id: string, title: string, completed: boolean) {
        this.id = id;
        this.title = title;
        this.completed = completed
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            completed: this.completed
        }
    }
}