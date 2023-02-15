import {Service} from "typedi";
import {IGreetingContent} from "./types/IGreetingContent";
import {DEFAULT_NAME} from "./greeting.constants";

@Service()
export class GreetingService {
    private greetingTemplate: string;
    private idCount: number;

    constructor() {
        this.greetingTemplate = process.env.GREETING || "Hello, %s!";
        this.idCount = 1;
    }

    public getGreetingContent(name: string = DEFAULT_NAME): IGreetingContent {
        const content = this.greetingTemplate.replace('%s', name);
        return {
            id: this.idCount++,
            content
        }
    }
}