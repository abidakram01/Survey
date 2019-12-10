import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-review',
  templateUrl: './survey-review.component.html',
  styleUrls: ['./survey-review.component.css']
})
export class SurveyReviewComponent implements OnInit {
  questionList: any[] = [
    {
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "textbox", value: "text-box" }
    },
    {
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "textarea", value: "text-box" }
    },
    {
      options: [{
        optionName: "Sachin",
        type: "dropdown"
      }, {
        optionName: "Dravid",
        type: "dropdown"
      }, {
        optionName: "Kohli",
        type: "dropdown"
      }],
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "dropdown", value: "dropdown" }
    },
    {
      options: [{
        optionName: "1",
        type: "dropdown"
      }, {
        optionName: "2",
        type: "dropdown"
      }, {
        optionName: "3",
        type: "dropdown"
      }, {
        optionName: "4",
        type: "dropdown"
      }, {
        optionName: "5",
        type: "dropdown"
      }],
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "rating", value: "rating" }
    }, {
      min: 0, max: 20, step: 1,
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "slider", value: "rating" }
    }, {
      options: [{
        optionName: "Sachin",
        type: "checkbox"
      }, {
        optionName: "Dravid",
        type: "checkbox"
      }, {
        optionName: "Kohli",
        type: "checkbox"
      }],
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "checkbox", value: "Checkbox" }
    },
    {
      options: [{
        optionName: "Sachin",
        type: "checkbox"
      }, {
        optionName: "Dravid",
        type: "checkbox"
      }, {
        optionName: "Ganguli",
        type: "checkbox"
      }],
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "checkbox", value: "Checkbox" }
    },
    {
      options: [{
        optionName: "Sachin",
        type: "checkbox"
      }, {
        optionName: "Dravid",
        type: "checkbox"
      }, {
        optionName: "Ganguli",
        type: "checkbox"
      }],
      questName: "Who is your favourite cricketer?",
      selectedElement: { type: "radio", value: "Checkbox" }

    }
  ]

  constructor() { }
  showIcon(index: number, answer) {
    if (answer >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  saveQuestion() {
    console.log(this.questionList)
  }
  ngOnInit() {
  }




}
