import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonBlockComponent} from '@shared/blocks/blocks/common.block';

@Component({
  selector: 'jms-background-hero-block',
  templateUrl: './background-hero-block.component.html',
  styleUrls: ['./background-hero-block.component.scss',
  '../common-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundHeroBlockComponent extends CommonBlockComponent  {
  @Input()
  data: {
    title?: string;
    subtitle?: string;
    description?: string;
    background?: string;
    center?: boolean;
  };
}