/*
 * Silex website builder, free/libre no-code tool for makers.
 * Copyright (c) 2023 lexoyo and Silex Labs foundation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import grapesjs, { Editor, EditorConfig, RichTextEditorAction } from 'grapesjs'
//import * as grapesjs from 'grapesjs';
import openImport from './openImport'

/**
 * @fileoverview This is where grapes config gets created
 * Handle plugins, options and initialization of the editor
 */

// ////////////////////
// Plugins
// ////////////////////
import blocksBasicPlugin from 'grapesjs-blocks-basic'
import styleFilterPlugin from 'grapesjs-style-filter'
import formPlugin from 'grapesjs-plugin-forms'
import codePlugin from 'grapesjs-custom-code'
import uiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes'
import filterStyles from '@silexlabs/grapesjs-filter-styles'
import symbolsPlugin from '@silexlabs/grapesjs-symbols'
import loadingPlugin from '@silexlabs/grapesjs-loading'
import fontsDialogPlugin, { cmdOpenFonts } from '@silexlabs/grapesjs-fonts'
import symbolDialogsPlugin, { cmdPromptAddSymbol } from './symbolDialogs'
import footerPlugin from './footer'
import breadcrumbsPlugin from './breadcrumbs'
import imgPlugin from './img'
import cssPropsPlugin from './css-props'
import rateLimitPlugin from '@silexlabs/grapesjs-storage-rate-limit'
import borderPugin from 'grapesjs-style-border'
import backgroundPlugin from 'grapesjs-style-bg'

import { pagePanelPlugin, cmdTogglePages, cmdAddPage } from './page-panel'
import { newPageDialog, cmdOpenNewPageDialog } from './new-page-dialog'
import { projectBarPlugin } from './project-bar'
import { settingsDialog, cmdOpenSettings } from './settings'
import { blocksPlugin } from './blocks'
import { orderedList, richTextPlugin, unorderedList } from './rich-text'
import { internalLinksPlugin } from './internal-links'
import ViewButtons from './view-buttons'
//import { storagePlugin } from './storage'

const plugins = [
  {name: './project-bar', value: projectBarPlugin}, // has to be before panels and dialogs
  {name: 'grapesjs-style-bg', value: backgroundPlugin},
  {name: './settings', value: settingsDialog},
  {name: '@silexlabs/grapesjs-fonts', value: fontsDialogPlugin},
  {name: './new-page-dialog', value: newPageDialog},
  {name: './page-panel', value: pagePanelPlugin},
  {name: 'grapesjs-blocks-basic', value: blocksBasicPlugin},
  {name: './blocks', value: blocksPlugin},
  {name: './view-buttons', value: ViewButtons},
  {name: './rich-text', value: richTextPlugin},
  {name: 'grapesjs-style-filter', value: styleFilterPlugin},
  {name: 'grapesjs-plugin-forms', value: formPlugin},
  {name: 'grapesjs-custom-code', value: codePlugin},
  {name: './internal-links', value: internalLinksPlugin},
  {name: '@silexlabs/grapesjs-ui-suggest-classes', value: uiSuggestClasses},
  {name: '@silexlabs/grapesjs-filter-styles', value: filterStyles},
  {name: './symbolDialogs', value: symbolDialogsPlugin},
  {name: '@silexlabs/grapesjs-symbols', value: symbolsPlugin},
  //{name: './storage', value: storagePlugin},
  {name: '@silexlabs/grapesjs-loading', value: loadingPlugin},
  {name: './breadcrumbs', value: breadcrumbsPlugin},
  {name: './img', value: imgPlugin},
  {name: './css-props', value: cssPropsPlugin},
  {name: './footer', value: footerPlugin},
  {name: '@silexlabs/grapesjs-storage-rate-limit', value: rateLimitPlugin},
  {name: 'grapesjs-style-border', value: borderPugin},
]
// Check that all plugins are loaded correctly
plugins
  .filter(p => typeof p.value !== 'function')
  .forEach(p => {
    throw new Error(`Plugin ${p.name} could not be loaded correctly (${p.value})`)
  })

// Constants
const PRIMARY_COLOR = '#333333'
const SECONDARY_COLOR = '#ddd'
const TERTIARY_COLOR = '#8873FE'
const QUATERNARY_COLOR = '#A291FF'
const DARKER_PRIMARY_COLOR = '#363636'
const LIGHTER_PRIMARY_COLOR = '#575757'

// ////////////////////
// Config
// ////////////////////
const catBasic = 'Containers'
const catComponents = 'Components'

export function getEditorConfig(): EditorConfig {
  return {
    container: '#gjs',
    height: '100%',
    showOffsets: true,
    showDevices: true,

    //pageManager: {},

    layerManager: {
      appendTo: '.layer-manager-container',
    },

    blockManager: {
      appendTo: '.block-manager-container',
    },

    assetManager: {
      upload: false //`${rootUrl}${API_PATH}${API_WEBSITE_PATH}${API_WEBSITE_ASSETS_WRITE}/?websiteId=${id}${ connectorId ? `&connectorId=${connectorId}` : ''}`,
    },

    storageManager: {
      autoload: false,
    },

    cssIcons: './css/all.min.css',
    canvasCss: `
      :root {
        --primaryColor: ${PRIMARY_COLOR};
        --secondaryColor: ${SECONDARY_COLOR};
        --tertiaryColor: ${TERTIARY_COLOR};
        --quaternaryColor: ${QUATERNARY_COLOR};
        --darkerPrimaryColor: ${DARKER_PRIMARY_COLOR};
        --lighterPrimaryColor: ${LIGHTER_PRIMARY_COLOR};
      }
      .gjs-frame-selected {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5) !important; // Change to red border
      }
      .gjs-selected {
        outline: 2px solid var(--tertiaryColor) !important;
        outline-offset: -2px;
      }
    `,

    richTextEditor: {
      // @ts-ignore
      actions: ['bold', 'italic', 'underline', 'strikethrough', 'link', 'wrap', orderedList, unorderedList],
    },


    plugins: plugins.map(p => p.value),

    pluginsOpts: {
      [blocksBasicPlugin.toString()]: {
        blocks: ['text', 'image', 'video', 'map'],
        category: catBasic,
        //flexGrid: true,
      },
      [projectBarPlugin.toString()]: {
        panels: [
          {
            id: 'header-spacer',
            attributes: { containerClassName: 'spacer', },
            command: -1,
          },{
            id: 'block-manager-btn',
            className: 'block-manager-btn fa fa-fw fa-plus',
            attributes: { title: 'Blocks', containerClassName: 'block-manager-container', },
            command: 'open-blocks',
          }, {
            id: 'symbols-btn',
            className: 'symbols-btn fa-regular fa-gem',
            attributes: { title: 'Symbols', containerClassName: 'symbols-list-container', },
            command: 'open-symbols',
            buttons: [
              {
                id: 'symbol-create-button',
                className: 'pages__add-page fa-solid fa-plus',
                label: 'Create symbol from selection',
                command: cmdPromptAddSymbol,
              },
            ],
          }, {
            id: 'page-panel-btn',
            className: 'page-panel-btn fa fa-fw fa-file',
            attributes: { title: 'Pages', containerClassName: 'page-panel-container', },
            command: cmdTogglePages,
            buttons: [{
              className: 'pages__add-page fa fa-file',
              command: cmdAddPage,
              text: '+',
            }],
          }, {
            id: 'layer-manager-btn',
            className: 'layer-manager-btn fa-solid fa-layer-group',
            attributes: { title: 'Layers', containerClassName: 'layer-manager-container', },
            command: 'open-layers',
          }, {
            id: 'font-dialog-btn',
            className: 'font-manager-btn fa-solid fa-font',
            attributes: { title: 'Fonts' },
            command: () => {
              editor.runCommand(cmdOpenFonts)
            },
          }, {
            id: 'spacer',
            attributes: {},
            className: 'project-bar-spacer',
          }, {
            id: 'settings-dialog-btn',
            className: 'page-panel-btn fa-solid fa-gears',
            attributes: { title: 'Settings' },
            command: cmdOpenSettings,
          }
        ],
      },
      [pagePanelPlugin.toString()]: {
        cmdOpenNewPageDialog,
        cmdOpenSettings,
        appendTo: '.page-panel-container',
      },
      [uiSuggestClasses.toString()]: {
        enableCount: false,
        enablePerformance: false,
      },
      [filterStyles]: {
        appendBefore: '.gjs-sm-sectors',
      },
      [internalLinksPlugin.toString()]: {
        // FIXME: warn the user about links in error
        onError: (errors) => console.warn('Links errors:', errors),
      },
      [codePlugin.toString()]: {
        blockLabel: 'HTML',
        blockCustomCode: {
          category: catComponents,
        }
      },
      [symbolsPlugin.toString()]: {
        appendTo: '.symbols-list-container',
        emptyText: 'No symbol yet.',
        primaryColor: PRIMARY_COLOR,
        secondaryColor: SECONDARY_COLOR,
        highlightColor: TERTIARY_COLOR,
      },
      [fontsDialogPlugin.toString()]: {
        api_key: 'AIzaSyAdJTYSLPlKz4w5Iqyy-JAF2o8uQKd1FKc',
      },
      [rateLimitPlugin.toString()]: {
        time: 2000,
      },
    },
  }
}

// ////////////////////
// Initialize editor
// ////////////////////
// Keep a ref to the editor singleton
let editor: Editor
export async function initEditor(config: EditorConfig) {
  if(editor) throw new Error('Grapesjs editor already created')
  return new Promise<Editor>((resolve, reject) => {
    try {
      /* @ts-ignore */
      editor = grapesjs.init(config)
    } catch(e) {
      console.error('Error initializing GrapesJs with plugins:', plugins, e)
      reject(e)
    }

    // customize the editor
    ['text']
      .forEach(id => editor.Blocks.get(id)?.set('category', 'Basics'))
    ;['image', 'video']
      .forEach(id => editor.Blocks.get(id)?.set('category', 'Media'))
    ;['map']
      .forEach(id => editor.Blocks.get(id)?.set('category', 'Components'))
    editor.Blocks.render([])

    editor.Commands.add('gjs-open-import-webpage', openImport(editor, {
      modalImportLabel: '',
      modalImportContent: 'Paste a web page HTML code here.',
      modalImportButton: 'Import',
      modalImportTitle: 'Import from website',
    }))

    // Adjustments to do when the editor is ready
    editor.on('load', () => {
      const views = editor.Panels.getPanel('views')

      // Remove blocks and layers buttons from the properties
      // This is because in Silex they are on the left
      views.buttons.remove('open-blocks')
      views.buttons.remove('open-layers')

      // Remove useless buttons
      editor.Panels.getPanel('options').buttons.remove('export-template')

      // Render the block manager, otherwise it is empty
      editor.BlockManager.render(null)

      // use the style filter plugin
      editor.StyleManager.addProperty('extra', { extend: 'filter' })

      // GrapesJs editor is ready
      resolve(editor)
    })
  })
}

export function getEditor() {
  return editor
}
