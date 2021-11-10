import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OnChange} from '@jaspero/ng-helpers';
import {CommonBlockComponent} from '@shared/blocks/blocks/common.block';

@Component({
  selector: 'jms-background-hero',
  templateUrl: './background-hero.component.html',
  styleUrls: ['./background-hero.component.scss',
  '../common-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundHeroComponent extends CommonBlockComponent {

  @OnChange(function() {
    const image = window.innerWidth < 500 ? this.data.mobileImage : this.data.image;
    this.background = {
      'background-image': `url('${image}')`
    };
  })
  data: any;

  background: {'background-image': string};
}
