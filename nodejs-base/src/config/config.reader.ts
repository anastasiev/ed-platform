import {Service} from "typedi";
import { propertiesToJson } from 'properties-file';
import * as path from 'path';


@Service()
export default class ConfigReader {
    private configPath: string;
    private config: any;
    constructor() {
        this.configPath = process.env.CONFIG_LOCATION ||
            path.resolve(__dirname, `../../../kustomization/local.properties`);
        this.config = propertiesToJson(this.configPath);
    }
    getAppConfig(): any{
        return this.config;
    }
}