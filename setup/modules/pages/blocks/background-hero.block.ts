import {COMMON_OPTIONS} from './shared';

export const BACKGROUND_HERO_BLOCK = {
  id: 'hero',
  label: 'Hero',
  icon: 'subject',
  previewTemplate: `<jms-background-hero [data]="data"></jms-background-hero>`,
  previewValue: {
    content: '<h1>Custom Title</h1><h2>Custom Subtitle</h2><p>Custom content</p>',
    ...COMMON_OPTIONS.defaults
  },
  form: {
    segments: [
      {
        type: 'empty',
        fields: [
          '/title',
          '/subtitle',
          '/image',
          '/mobileImage'
        ],
      },
      ...COMMON_OPTIONS.segment
    ],
    schema: {
      properties: {
        title: {type: 'string'},
        subtitle: {type: 'string'},
        image: {type: 'string'},
        mobileImage: {type: 'string'},
        ...COMMON_OPTIONS.properties
      }
    },
    definitions: {
      title: {label: 'Title'},
      subtitle: { label: 'Subtitle',},
      image: {label: 'Background', component: {type: 'image'}},
      mobileImage: {label: 'Mobile Background', component: {type: 'image'}},
      ...COMMON_OPTIONS.definitions
    }
  }
};
