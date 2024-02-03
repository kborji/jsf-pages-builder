import type { Component, ComponentManager, Editor, Trait } from 'grapesjs';
import traits from '../../traits/dataTableTraits';
import categories from '../../../blockCategories';
import i18next from '../../../i18n';
import { ComponentBuilder } from '../../../model/ComponentBuilder';
import { html, render } from 'lit-html'

class DataTableBuilder extends ComponentBuilder {

    constructor() {
        super("dataTable", i18next.t("components.dataTable", { ns: "blocks" }));
    }

    protected addComponentBlock(editor: Editor): void {
        const category = categories.jsfForms;
        editor.BlockManager.add('p:dataTable', {
            label: `
            <i class="fa-solid fa-input-text"></i>
            <div>${this._label}</div>`,
            category: category.name,
            content: `<p:dataTable var="var" data-gjs-type="${this._typeName}"></p:dataTable>`,
        });
    }
    protected defineComponentType(editor: Editor): void {
        const { Components } = editor;
        const defaultType = Components.getType('input');
        const defaultModel = defaultType?.model;

        // INPUT
        Components.addType(this._typeName, {
            isComponent: el => el.tagName == 'P:DATATABLE',
            extend: 'div',
            model: {
                defaults: {
                    // ...defaultModel.prototype.defaults,
                    tagName: 'p:dataTable',
                    'custom-name': this._label,
                    draggable: 'form, form *',
                    droppable: true,
                    traits: traits,
                },
            },
            //extendView: 'div',
            view: {
                tagName: () => 'div',
                // components: '<input type="text"></input>',
                onRender({ el, model }) {
                    // const tableTitleTrait = model.getTrait('title');
                    // if(tableTitleTrait == null) {
                        
                    // }
                    // console.log(model.getAttributes());
                    // console.log(tableTitleTrait);
                    // alert(tableTitleTrait);

                    // const value = tableTitleTrait.attributes.value;
                    // const tableTitleTrait: Trait | undefined = component?.getTrait('value');
                    // if
                    // tableTitleTrait.once('onChange', function (event) {
                        // alert('allow');
                    // });
                    // tableTitleTrait.onChange: function(event) {
                    //     const value = event.target.value;
                    //     console.log('Trait value changed to:', value);
                    //   },

                    const tableTitle = "Table";
                    // console.log(tableTitle);

                    const div = document.createElement('div');
                    const table = document.createElement('table');
                    div.appendChild(table);
                    const label = document.createElement('div');
                    label.innerHTML =
                        `
                    <div class="input-group input-group-sm mb-3">
                       <label >${tableTitle || 'Table'}</label><br>
                    </div>
                    `;

                    div.appendChild(label);
                    div.appendChild(table);
                    el.appendChild(div);
                },
                
            },
            
            // extendFnView: ['updateAttributes'],
            // {
            //     updateAttributes() {
            //         this.el.setAttribute('autocomplete', 'off');
            //     },
            // }
        });

        // editor.on('canvas:drop', (dataTransfer, model) => {
        //     console.log('on canvas:drop');
        //     console.log(dataTransfer);
        //     console.log(model);
        // });
    }


    protected onDrop(editor: Editor) {
        editor.on('component:add', (model) => {
            alert('wazwaz 1');
            model.on('change:components', () => {
                alert('wazwaz 2');
              console.log('A component has been added to the canvas');
            });
          });
    }

}

export default new DataTableBuilder();