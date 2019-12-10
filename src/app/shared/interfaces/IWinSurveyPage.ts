import { IWinQuestions } from "./IWinQuestion";

export class IWinSurveyPage {
    order: number;
    title: string;
    questions: IWinQuestions[];
}