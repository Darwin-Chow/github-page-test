import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UAParser } from 'ua-parser-js';
import { AngularDeviceInformationService } from 'angular-device-information';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnalyticDataService {

  ipAddress = '';
  ipChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private deviceInformationService: AngularDeviceInformationService,
  ) { }

  changeIpStatus(value: boolean) {
    this.ipChange.next(value);
  }

  requestAnalytics() {
    this.getIP();

    this.ipChange.subscribe((data) => {
      var analytics = this.getAnalytics();
      // alert(analytics);
      let title = "[Notification] Webpage Github-Page-Test has been access by someone";
      this.sendEmail(title, analytics);
    })
  }

  private getAnalytics(): string {

    let parser = new UAParser(window.navigator.userAgent); // you need to pass the user-agent for nodejs

    // console.log(window.navigator.userAgent);
    let parserResults = parser.getResult();

    var analytics = `IP address: ${this.ipAddress}
                \nUser-agent: ${parserResults.ua}
                \nBrowser: ${parserResults.browser.name} (ver. ${parserResults.browser.version})
                \nOS: ${parserResults.os.name} (ver. ${parserResults.os.version})
                \nDeviceType: ${this.deviceInformationService.getDeviceType()}
                \nDevice: ${parserResults.device.model} (${parserResults.device.type}) [${parserResults.device.vendor}]`;

    let analyticsInHTML = `<p>IP address: ${this.ipAddress}</p>
                <p>Access Date: ${new Date}</p>
                <p>User-agent: ${parserResults.ua}</p>
                <p>Browser: ${parserResults.browser.name} (ver. ${parserResults.browser.version})</p>
                <p>OS: ${parserResults.os.name} (ver. ${parserResults.os.version})</p>
                <p>DeviceType: ${this.deviceInformationService.getDeviceType()}</p>
                <p>Device: ${parserResults.device.model} (${parserResults.device.type}) [${parserResults.device.vendor}]</p>`;

    // alert(formatRes);
    return analyticsInHTML;
  }

  private getIP() {
    // this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    //   alert('ip: ' + res.ip);
    //   this.ipAddress = res.ip;
    // });

    this.http.get('https://jsonip.com')
    .subscribe(
      (value:any) => {
        console.log(value.ip);
        this.ipAddress = value.ip;
        // alert('Your IP address: ' + this.ipAddress);
        this.changeIpStatus(true);
        // return this.getOtherAnalytics();
      },
      (error) => {
        console.log(error);
        this.ipAddress = "unknown";
        this.changeIpStatus(true)
        // return this.getOtherAnalytics();
      }
    );

  }

  sendEmail(title: string, body: string) {
    // alert(this.email.value);
    Email.send({
        Host : 'smtp.elasticemail.com',
        Username : 'darwinhk0000@gmail.com',
        Password : '4DFD31AF105191ACD534E6B16B4A785EA452',
        To : "darwinhk0000@gmail.com",
        From : 'darwinhk0000@gmail.com',
        Subject : `${title}`,
        Body : `${body}`
    })
    .then( message => {
          console.log(message);
        }
    );
  }
}
