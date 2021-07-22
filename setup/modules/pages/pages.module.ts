import {FORMAT_SEARCH} from '../shared/format-search';
import {META} from '../shared/meta';
import {ORDER} from '../shared/order';
import {BACKGROUND_HERO} from './blocks/background-hero';
import {CARDS} from './blocks/cards';
import {CONTENT_BLOCK} from './blocks/content.block';
import {FORM_BLOCK} from './blocks/form.block';
import {INVENTORY} from './blocks/inventory';
import {MAP} from './blocks/map';
import {COLUMNS} from './blocks/three-columns';
import {PROCESSED} from './processed.const';
import {FAQ} from './blocks/faq';

const blocks = [
  CONTENT_BLOCK,
  FORM_BLOCK,
  INVENTORY,
  BACKGROUND_HERO,
  FAQ,
  CARDS,
  MAP,
  COLUMNS,
];

export const PAGES_MODULE = {
  id: 'pages',
  name: 'Pages',
  authorization: {
    write: ['admin']
  },
  layout: {
    editTitleKey: 'title',
    ...ORDER.layout(),
    instance: {
      segments: [
        {
          title: 'GENERAL.GENERAL',
          type: 'card',
          fields: [
            '/id',
            '/title',
            '/featured',
            '/links',
          ],
          columnsDesktop: 6
        },
        META.segment({columnsDesktop: 6}),
        {
          type: 'empty',
          fields: [
            '/blocks'
          ]
        }
      ]
    },
    table: {
      tableColumns: [
        {key: '/title', label: 'PB.FORM.TITLE'},
        {key: '/id', label: 'URL'},
        {key: '/featured', label: 'Featured', control: true },
        {key: '/links', label: 'Links'},
      ]
    }
  },
  schema: {
    properties: {
      id: {type: 'string'},
      title: {type: 'string'},
      featured: {type: 'boolean'},
      links: {type: 'string'},
      order: {type: 'number'},
      blocks: {type: 'array'},
      ...META.property(),
      ...ORDER.property
    }
  },
  definitions: {
    id: {
      label: 'URL',
      disableOn: 'edit',
      formatOnSave: FORMAT_SEARCH(),
      hint: 'Created from title if left empty'
    },
    title: {label: 'Title'},
    featured: {label: 'Featured'},
    links: {
      label: 'Type of link',
      component: {
        type: 'select',
        configuration: {
          dataSet: [
            {name: 'Header link', value: 'headerLink'},
            {name: 'Footer Link', value: 'footerLink'},
            {name: '', value: ''},
          ]
        }
      }
    },
    blocks: {
      component: {
        type: 'pb-blocks',
        configuration: {
          styles: PROCESSED.css,
          blocks,
          styleUrls: []
        }
      }
    },
    ...META.definitions()
  }
};
