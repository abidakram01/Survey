import { IWinOptions } from "./IWinOptions";

export class IWinQuestions {
    question_type: {
        question_type: string;
        status: boolean;
    };
    order: number;
    question: string;
    options: IWinOptions[];
}