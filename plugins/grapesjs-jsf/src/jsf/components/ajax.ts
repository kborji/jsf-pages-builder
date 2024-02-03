import type { ComponentManager, Editor } from 'grapesjs';
import ajaxTraits from '../traits/ajaxTraits';
import categories from '../../blockCategories';
import i18next from '../../i18n';
import { ComponentBuilder } from '../../model/ComponentBuilder';

class AjaxBuilder extends ComponentBuilder {
    
    constructor() {
        super("ajax", i18next.t("components.ajax",{ns: "blocks"}));
    }
    
    protected addComponentBlock(editor: Editor): void {
        const category = categories.jsfForms;
        editor.BlockManager.add('p:ajax', {
            label: `
            <i class="fa-solid fa-input-text"></i>
            <div>${this._label}</div>`,
            category: category.name,
            content: `<p:ajax data-gjs-type="${this._typeName}"></p:ajax>`,
        });
    }
    protected defineComponentType(editor: Editor): void {
        const { Components } = editor;
        // const defaultType = Components.getType('input');
        // const defaultModel = defaultType?.model;

        // INPUT
        
        Components.addType(this._typeName, {
            isComponent: el => el.tagName == 'P:AJAX',
            extend: '<span>',
            model: {
                defaults: {
                    // ...defaultModel.prototype.defaults,
                    tagName: 'p:ajax',
                    // components: '<span class="fa fa-star"></span>',
                    // tagName: 'input',
                    'custom-name': this._label,
                    draggable: 'div[data-gjs-type="jsfInputText"], div[data-gjs-type="datatable"]',
                    droppable: false,
                    traits: ajaxTraits,
                },
                
            },
            // extendView: 'input', // this what shows in the user's view
            // view tagName is not needed, it is the html tag name
            view: {
                tagName: () => 'div',
                // attributes: {
                //     class: 'fa fa-star',
                // },
                onRender({ el }) {
                    const span = document.createElement('span');
                    el.classList.add("fa");
                    el.classList.add("fa-star");
                    el.style.position = "absolute";
                    el.appendChild(span);
                  },
                
            }
            // extendFnView: ['updateAttributes'],
            // {
            //     updateAttributes() {
            //         this.el.setAttribute('autocomplete', 'off');
            //     },
            // }
        });
    }

}

export default new AjaxBuilder();