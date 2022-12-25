import { WordsObject } from './../wordsObject.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { zoomInDialog } from './zoomIn-dialog/zoomIn-dialog';

export interface DialogData {
  id: number;
  word: string;
}

// export interface Options {
//   input: string;
//   result: string;
// }

const Selected = {
  input: "繁",
  result: "簡",
}

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.scss']
})
export class TranslatePageComponent implements OnInit {

  content = '';
  translate = '';
  translateArr: string[] = [];
  wordList: WordsObject | any;

  selected = Selected;

  // selected = '繁';

  constructor(private httpClient: HttpClient,
    public dialog: MatDialog,
  ) { }

  zoomInDialog(id: number, word: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(zoomInDialog,
      {
        maxWidth: '95vw',
        data: {
          id: -1,
          word: word,
        },
        // enterAnimationDuration,
        // exitAnimationDuration,
      },

    );
  }

  ngOnInit(): void {
    this.httpClient.get("assets/words.json").subscribe( (data) => {
      // console.log(data);
      this.wordList = data;
      // this.wordList = data;
      // console.log(this.wordList);

      this.wordList.simp = JSON.parse(this.wordList.simp);
      this.wordList.trad = JSON.parse(this.wordList.trad);
    });
  }

  translateWords() {
    this.translate = '';
    this.translateArr = [];


    for (let w of this.content) {

      // find if word is Chinese Words
      if (w.match(/[\u3400-\u9FBF]/) == null) {
        this.translate += w;
        this.translateArr.push(w);
      }
      else {

        // translate to simplied Chinese (result)
        if (this.selected.result == '簡') {
          let index = this.wordList.trad.findIndex((x: string) => x == w);

          if (index != -1) {
              // index = this.wordList.simp.findIndex((x: string) => x == w);
              // if (index != -1 ) {
                this.translate += this.wordList.simp[index];
                this.translateArr.push(this.wordList.simp[index]);
                continue;
              // }
          }

          this.translate += w;
          this.translateArr.push(w);
        }
        else {
          let index = this.wordList.simp.findIndex((x: string) => x == w);

          if (index != -1) {
                this.translate += this.wordList.trad[index];
                this.translateArr.push(this.wordList.trad[index]);
                continue;
          }

          this.translate += w;
          this.translateArr.push(w);
        }

      }
    }

    // console.log(this.translateArr);
  }

  reverse() {
    this.selected.input = (this.selected.input == '繁')? '簡': '繁';
    this.selected.result = (this.selected.result == '繁')? '簡': '繁';

    let tmp = this.content;

    // EDIT: chnage to use trans array
    this.content = this.translate;
    this.translate = tmp;

    // reverse input & result form content
    this.translateWords();
  }

  onChange(event: any) {
    this.translateWords();
  }

}
