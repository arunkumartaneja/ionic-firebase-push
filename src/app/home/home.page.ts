import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform) {
    
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

        this.fcm.getToken().then(token => {
          console.log('getToken', token);
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log('onTokenRefresh', token);
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });

        let self = this;
        setTimeout(function() {
          self.fcm.getToken().then(token => {
            console.log('getToken setTimeout', token);
            // Register your new token in your back-end if you want
            // backend.registerToken(token);
          });
        }, 10000);
      })
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      console.log('getToken', token);
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

}
