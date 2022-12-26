import { AnalyticDataService } from './analytic-data.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { WordsObject } from './wordsObject.model';
// import { randomInt } from 'crypto';
// import Bowser from 'bowser';
import { UAParser } from 'ua-parser-js';
import { AngularDeviceInformationService } from 'angular-device-information';

import  "../assets/smtp.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appTitle = '規範漢字學習網'

  // ipAddress = '';
  // ipChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
              private deviceInformationService: AngularDeviceInformationService,
              private analyticService: AnalyticDataService,
              )
  {
    if (localStorage.getItem("visited") == null || this.isLastAccessLargerThanDays()) {

      this.analyticService.requestAnalytics();
      localStorage.setItem("visited", (new Date()).toISOString());
    }

  }

  ngOnInit(): void {

  }

  isLastAccessLargerThanDays(): boolean {
    var lastAccess: string = localStorage.getItem("visited")!;
    let diff = ((new Date()).getTime() - (new Date(lastAccess)).getTime()) / (1000 * 60 * 60 * 24);
    if (diff >= 1) {
      return true;
    }

    return false;
  }


}
