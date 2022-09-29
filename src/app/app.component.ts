import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WordsObject } from './wordsObject.model';
// import { randomInt } from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-page-test';

  // wordList: any = [];
  word: string = "";
  word_id = {trad: 0, id: 0};

  front: boolean = true;
  isLocked: boolean = false;
  lockVal: number = 0;


  wordList: WordsObject | any;
  wordsWithSimp: number[] = [];

  isWordReady: boolean = false;

  a = [123, 234];

  onClick() {
    alert("Pop out Message!!");
    // num = randomInt()
  }

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.httpClient.get("assets/words.json").subscribe( (data) => {
      // console.log(data);
      this.wordList = data;
      // this.wordList = data;
      // console.log(this.wordList);

      this.wordList.simp = JSON.parse(this.wordList.simp);
      this.wordList.trad = JSON.parse(this.wordList.trad);

      // console.log(this.wordList.simp[2]);
      this.initRmdList();
      this.getRandomWord();
    })
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
    this.lockVal = this.word_id.trad;
  }

  initRmdList() {
    var l: string[] = this.wordList.simp;
    l.forEach((key, index) => {
      if (key != this.wordList.trad[index]) {
        // console.log(key);
        this.wordsWithSimp.push(index);
      }
    })
    // console.log(this.wordsWithSimp);
  }

  getRandomWord() {
    // var num: number = Math.floor(Math.random() * this.wordList.simp.length);

    var probList: number[] = [];

    for (let i = 0; i < 8; i++) {
      let id: number = this.getRandomEle(this.wordsWithSimp);
      probList.push(id);
    }

    for (let i = 0; i < 2; i++) {
      let num: number = Math.floor(Math.random() * this.wordList.simp.length);

      // console.log(this.wordList.simp.length);

      while (num in probList) {
        num = Math.floor(Math.random() * this.wordList.simp.length);
        // console.log("Num: " + num);
      }

      probList.push(num);

      // console.log(num);
    }

    var rmd_id = this.getRandomEle(probList);

    console.log(probList);

    this.word_id.id = rmd_id;

    // get random range on Selecting Simp or Trad Words (50%)
    var rmd: number = Math.random() * 10;

    if (this.isLocked) {
      if (this.lockVal == 1) this.word = this.wordList.trad[this.word_id.id];
      else  this.word = this.wordList.simp[this.word_id.id];

      this.word_id.trad = this.lockVal;
    }
    else if (rmd >= 4.5) {
      this.word_id.trad = 1;
      this.word = this.wordList.trad[this.word_id.id];
    }
    else {
      this.word_id.trad = 0;
      this.word = this.wordList.simp[this.word_id.id];
    }
    // this.word_id = num;

    this.isWordReady = true;
  }



  convertWord() {
    // alert('click');
    if (this.word_id.trad == 0) {
      this.word = this.wordList.trad[this.word_id.id];
      this.word_id.trad = 1;
      // this.word = 'ddd';
    }
    else {
      // this.word = 'fff';
      this.word = this.wordList.simp[this.word_id.id];
      this.word_id.trad = 0;
    }
  }

  isNoSimp() {
    if (this.compareWords(this.word_id.id)) {
      alert("對！");
    }
    else {
      alert("錯！");
      // present correct answer...
    }

    this.getRandomWord();
  }

  compareWords(wordID: number): boolean {
    return (this.wordList.simp[wordID] === this.wordList.trad[wordID]);
  }

  getRandomEle(arr: Array<any>): any {
    const randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  }






}
