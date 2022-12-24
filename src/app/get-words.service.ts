import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsObject } from './wordsObject.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetWordsService {

  wordList: WordsObject | any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async loadWordsList(): Promise<Observable<WordsObject>> {
    await this.httpClient.get("assets/words.json").subscribe( (data) => {
      // console.log(data);
      this.wordList = data;
      // this.wordList = data;
      // console.log(this.wordList);

      this.wordList.simp = JSON.parse(this.wordList.simp);
      this.wordList.trad = JSON.parse(this.wordList.trad);

      console.log("01");
      return this.wordList;
    })

    return this.wordList;
    // return {};
  }
}
