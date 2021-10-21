import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Category} from '@shared/interfaces/category.interface';
import {Model} from '@shared/interfaces/model.interface';
import {Product} from '@shared/interfaces/product.interface';
import {Subcategories} from '@shared/interfaces/subcategories.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, scan, startWith, switchMap, tap} from 'rxjs/operators';
import {CommonBlockComponent, CommonOptions} from '../common.block';

interface InventoryOptions extends CommonOptions {
  title: string;
  loadMore: boolean;
  categories: boolean;
  subCategories: boolean;
  page: number;
}

@UntilDestroy()
@Component({
  selector: 'jms-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent extends CommonBlockComponent implements OnInit {
  constructor(
    public el: ElementRef,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {
    super(el);
  }

  @Input()
  data: InventoryOptions;

  loadMore$ = new BehaviorSubject(true);
  enabled$ = new BehaviorSubject(true);
  selectedProduct$: BehaviorSubject<Partial<Product>>;
  products$: Observable<Product[]>;
  models$: Observable<Model[]>;
  subCategories$: Observable<Subcategories[]>;
  categories$: Observable<Category[]>;
  selectedCat: FormControl;
  selectedSubcat: FormControl;
  lastId: DocumentSnapshot<Product>;

  ngOnInit() {

    this.data.page = this.data.page || 10;

    const {queryParams} = this.activatedRoute.snapshot;

    this.selectedCat = new FormControl(
      queryParams.category || ''
    );

    this.selectedSubcat = new FormControl(
      queryParams.sc || ''
    );

    this.selectedProduct$ = new BehaviorSubject(
      queryParams.product ? {
        id: queryParams.product,
        title: queryParams.productTitle
      } : null
    );

    this.activatedRoute.queryParams
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(value => {
        this.selectedCat.setValue(value.category || '');

        this.selectedSubcat.setValue(value.sc || '');

        this.selectedProduct$.next(value.product ? {
          id: value.product,
          title: value.productTitle
        } : null);
      });

    this.categories$ = this.afs.collection(
      'categories',
      ref =>
        ref.orderBy('order', 'asc')
    )
      .get()
      .pipe(
        map(data =>
          data.docs.map(it => ({
            id: it.id,
            ...it.data() as Category
          }))
        )
      );

    this.models$ = this.selectedProduct$
      .pipe(
        filter(product => !!product),
        switchMap(product =>
          this.afs.collection(
            'models',
            ref =>
              ref
                .where('product', '==', product.id)
                .orderBy('order', 'asc')
          )
            .get()
        ),
        map(data =>
          data.docs.map(it => {

            const dt = it.data() as Model;

            return {
              id: it.id,
              style: `background-image:url("${dt.featured}")`,
              ...dt
            };
          })
        )
      );

    this.selectedCat.valueChanges
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(category => {
        this.enabled$.next(true);
        this.selectedSubcat.setValue('');
        this.lastId = null;
        this.changeUrlWithoutRefresh([
          {name: 'category', value: category}
        ]);
        this.selectedSubcat.setValue('');
      });

    this.selectedSubcat.valueChanges
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(sc => {
        this.enabled$.next(true);
        this.selectedProduct$.next(null);
        this.lastId = null;

        this.changeUrlWithoutRefresh([
          {name: 'category', value: this.selectedCat.value},
          {name: 'sc', value: sc}
        ]);
      });

    this.products$ = this.selectedSubcat.valueChanges
      .pipe(
        startWith(this.selectedSubcat.value),
        switchMap(() => {
          const category = this.selectedCat.value;
          const subCategory = this.selectedSubcat.value;

          return this.loadMore$
            .pipe(
              switchMap(() =>
                this.afs.collection(
                  'products',
                  ref => {
                    let final: any = ref
                      .orderBy('order', 'asc');

                    if (category) {
                      final = final.where(
                        'category',
                        '==',
                        category
                      );
                    }

                    if (subCategory) {
                      final = final.where(
                        'subCategory',
                        '==',
                        subCategory
                      );
                    }

                    if (this.lastId) {
                      final = final.startAfter(this.lastId);
                    }

                    return final.limit(this.data.page + 1);
                  }
                )
                  .get()
              ),
              map(data => {
                if (data.docs.length !== (this.data.page + 1)) {
                  this.enabled$.next(false);
                }

                const items = data.docs.slice(0, this.data.page);

                this.lastId = items[items.length - 1] as DocumentSnapshot<Product>;

                return items.map(it => ({
                  id: it.id,
                  ...it.data() as Product
                }));
              }),
              scan((acc, cur) => [...acc, ...cur], [])
            );
        })
      );

    this.subCategories$ = this.selectedCat.valueChanges
      .pipe(
        startWith(this.selectedCat.value),
        switchMap(() => {
          const category = this.selectedCat.value;

          return this.loadMore$
            .pipe(
              switchMap(() =>
                this.afs.collection(
                  'subCategories',
                  ref => {

                    let final: any = ref
                      .orderBy('order', 'asc');

                    if (category) {
                      final = final.where(
                        'category',
                        '==',
                        category
                      );
                    }

                    if (this.lastId) {
                      final = final.startAfter(this.lastId);
                    }

                    return final.limit(this.data.page + 1);
                  }
                )
                  .get()
              ),
              map(data => {
                if (data.docs.length !== (this.data.page + 1)) {
                  this.enabled$.next(false);
                }

                const items = data.docs.slice(0, this.data.page);

                this.lastId = items[items.length - 1] as DocumentSnapshot<Product>;

                return items.map(it => ({
                  id: it.id,
                  ...it.data() as Product
                }));
              }),
              scan((acc, cur) => [...acc, ...cur], [])
            );
        })
      );
  }

  track(index: number, item: Product) {
    return item.id;
  }

  selectProduct(product: Product) {
    this.selectedProduct$.next(product);
    this.changeUrlWithoutRefresh([
      {name: 'category', value: this.selectedCat.value},
      {name: 'sc', value: this.selectedSubcat.value},
      ...[{name: 'product', value: product ? product.id : ''}, {name: 'productTitle', value: product ? product.title : ''}]
    ]);

    if (!product) {
      this.enabled$.next(true);
      this.lastId = null;
    }
  }

  changeUrlWithoutRefresh(paramsToSet: {name: string, value: string}[]) {
    /**
     * Manually replace the url so as not to trigger
     * a page refresh
     */
    let url: any = new URL(window.location.href);
    const params = new window.URLSearchParams(window.location.search);

    paramsToSet.forEach(param => {
      if (param.value) {
        params.set(param.name, param.value);
      } else {
        params.delete(param.name);
      }
    });

    url.search = params;
    url = url.toString();
    window.history.pushState({url}, null, url);
    window.scrollTo({
      top: 0
    })
  }
}
