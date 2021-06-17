import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {snapshotMap} from '@shared/utils/snapshot-map.operator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BASE_TITLE} from '../../consts/base-title.const';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private afs: AngularFirestore
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const {collection, skipMeta} = route.data;
    const {id = route.data.id} = route.params;

    return this.getItem(id, collection).pipe(
      map((page: any) => {
        if (!page) {
          this.router.navigate(['/404']);
          return;
        }

        if (!skipMeta) {
          const valuesToSet = {...(page.meta || {})};
          this.title.setTitle(
            valuesToSet.title
              ? `${valuesToSet.title} | ${BASE_TITLE}`
              : BASE_TITLE
          );

          /**
           * To prevent iterating over the title and adding it as meta
           */
          delete valuesToSet.title;

          /**
           * Written like this instead of Object.entries to support older browsers
           */
          for (const name in valuesToSet) {
            if (valuesToSet.hasOwnProperty(name)) {
              this.meta.updateTag({name, content: valuesToSet[name]});
            }
          }
        }

        return page;
      })
    );
  }

  private getItem(id: string, collection?: string): any {
    return this.afs
      .collection(collection)
      .doc(id)
      .get()
      .pipe(
        snapshotMap()
      );
  }
}
