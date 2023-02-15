import {Service} from "typedi";
import {IGreetingContent} from "./types/IGreetingContent";
import {DEFAULT_NAME} from "./greeting.constants";
import ConfigReader from "../config/config.reader";

@Service()
export class GreetingService {
    private idCount: number;
    constructor(private readonly configReader: ConfigReader) {
        this.idCount = 1;
    }

    public getGreetingContent(name: string = DEFAULT_NAME): IGreetingContent {
        const {GREETING_TEMPLATE: greetingTemplate} = this.configReader.getAppConfig();
        const content = greetingTemplate.replace('%s', name);
        return {
            id: this.idCount++,
            content
        }
    }
}