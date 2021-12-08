import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterExtService } from './services/router.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TippingApp';

  constructor(
    private routerExtService: RouterExtService,
    private translate: TranslateService){
      // setting default translation
      translate.setDefaultLang('en');
      translate.use(this.getDeviceLanguage())

    }

  getDeviceLanguage(): string {
    return ['en', 'es', 'zh', 'ht', 'fr-FR'].find(item => navigator.language.toLowerCase().includes(item.toLowerCase()))
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
