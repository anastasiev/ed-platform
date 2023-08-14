import {Service} from "typedi";
import {QuestionsRepository} from "./questions.repository";

@Service()
export class QuestionsService {
    constructor(
        private readonly questionsRepository: QuestionsRepository
    ) {}

    public getFilters() {
        return this.questionsRepository.getFilters();
    }

    public getQuestions(topic: string, chapter: string): string[] {
        return this.questionsRepository.getQuestions(topic, chapter);
    }

    public checkAnswer(question: string, answer: string): boolean {
        return this.questionsRepository.checkAnswer(question, answer);
    }
}