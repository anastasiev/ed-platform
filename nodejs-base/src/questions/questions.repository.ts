import {Service} from "typedi";
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import {IFilters} from "./types/IFilters";
import {CustomError} from "../errors";

@Service()
export class QuestionsRepository {
    private rootContent = path.join(__dirname, '../../static');
    private readonly filters: IFilters;
    private readonly answers: {[question: string]: string};
    constructor() {
        this.filters = {topics: []};
        this.answers = {};
        fs.readdirSync(this.rootContent).forEach(topic => {
            this.filters.topics.push(topic);
            this.filters[topic] = [];
            const topicFolder = path.join(this.rootContent, topic);
            fs.readdirSync(topicFolder).forEach(chapter => {
                this.filters[topic].push(chapter)
                const answersFile = path.join(topicFolder, chapter, 'answers.csv');
                const answersContent = fs.readFileSync(answersFile).toString();
                const records = parse(answersContent, {
                    skip_empty_lines: true
                });
                records.forEach((record: any) => {
                   const questionFile = path.join(topicFolder, chapter, 'questions', record[0]);
                   this.answers[questionFile] = record[1];
                });
            });
        });
    }

    public getFilters(): IFilters {
        return this.filters;
    }

    public getQuestions(topic: string, chapter: string): string[] {
        const questionsFolder = path.join(this.rootContent, topic, chapter, 'questions');
        if (!fs.existsSync(questionsFolder)) {
            throw new CustomError(409, 'Invalid topic or chapter');
        }
        const questionsPaths = fs.readdirSync(questionsFolder)
            .map((questionFileName: string) => path.join('/', topic, chapter, 'questions', questionFileName));
        return questionsPaths;
    }

    public checkAnswer(question: string, answer: string): boolean {
        return this.answers[question] === answer;
    }
}