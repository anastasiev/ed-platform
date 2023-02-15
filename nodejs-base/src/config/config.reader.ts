import {Service} from "typedi";
import { propertiesToJson } from 'properties-file'

@Service()
export default class ConfigReader {
    private configPath: string;
    constructor() {
        this.configPath = process.env.CONFIG_LOCATION || ""
    }
    getAppConfig(): any{
        return propertiesToJson(this.configPath)
    }
}