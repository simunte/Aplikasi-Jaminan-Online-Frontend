import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  template: '<span></span>'
})
export class TitleComponent {
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private translate: TranslateService) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        let currentRoute = this.route.root;
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data.title;
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        if (title !== undefined) {
          this.titleService.setTitle(this.translate.instant(title));
        }
      });
  }
}
