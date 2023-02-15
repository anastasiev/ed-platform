import {Service} from "typedi";
import {IGreetingContent} from "./types/IGreetingContent";
import {DEFAULT_NAME} from "./greeting.constants";

@Service()
export class GreetingService {
    private greetingTemplate: string;

    constructor() {
        this.greetingTemplate = process.env.GREETING || "Hello, %s!";
    }

    public getGreetingContent(name: string = DEFAULT_NAME): IGreetingContent {
        const content = this.greetingTemplate.replace('%s', name);
        return {
            id: 1,
            content
        }
    }
}