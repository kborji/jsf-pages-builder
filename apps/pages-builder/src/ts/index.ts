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

/**
 * @fileoverview
 * Defines the entry point of Silex client side application
 *
 */

import { ClientConfig } from './config'
import { initEditor, getEditor } from './grapesjs'

// Expose API to calling app as window.silex
export * from './expose'

/**
 * Expose the config object
 */
export let config: ClientConfig

/**
 * Start Silex, called from host HTML page with window.silex.start()
 */
export async function start(options = {}): Promise<void> {
  config = new ClientConfig()
  Object.assign(config, options)

  // Debug mode
  if (config.debug) {
    console.warn('Silex starting in debug mode.', {config})
  }

  // Init GrapesJS config which depend on the config file properties
  config.initGrapesConfig()

  // Start grapesjs
  try{
    await initEditor(config.grapesJsConfig)
  } catch(e) {
    console.error('Error starting Silex', e)
    throw e
  }

  const editor = getEditor()

  // Store the config in the editor
  editor.getModel().set('config', config)

  // Init internationalization module
  editor.I18n.setLocale('en_US')

  // Load the site
  //editor.StorageManager.setAutosave(false)
  try {
    await editor.load(null)
  } catch(e) {
    if(e.httpStatusCode === 401) {
      // Unauthorized, will try to login
    } else {
      // Will display an error message, see in storage.ts
    }
  } finally {
    setTimeout(() => {
      // This needs time for grapesjs
      editor.editor.set('changesCount', 0)
      editor.StorageManager.setAutosave(true)
      // This needs time for the loader to be hidden
      document.querySelector('.silex-loader').classList.add('silex-dialog-hide')
      document.querySelector('#gjs').classList.remove('silex-dialog-hide')
    }, 100)
  }
}
