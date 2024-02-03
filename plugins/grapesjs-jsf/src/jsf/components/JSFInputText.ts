import type { Component, ComponentManager, Editor } from 'grapesjs';
import traits from '../traits/inputTextTraits';
import categories from '../../blockCategories';
import i18next from '../../i18n';
import { ComponentBuilder } from '../../model/ComponentBuilder';

class InputTextBuilder extends ComponentBuilder {

    constructor() {
        super("jsfInputText", i18next.t("components.input_text", { ns: "blocks" }));
    }

    protected addComponentBlock(editor: Editor): void {
        const category = categories.jsfForms;
        editor.BlockManager.add('h:inputText', {
            label: `
            <i class="fa-solid fa-input-text"></i>
            <div>${this._label}</div>`,
            category: category.name,
            content: `<h:inputText data-gjs-type="${this._typeName}" class="form-control"></h:inputText>`,
        });
        editor.on('block:drag:stop', (component: Component, block) => {
            if (component) {
                console.log(component.attributes.parent.attributes.type);
            }
        });

        
    }
    protected defineComponentType(editor: Editor): void {
        const { Components } = editor;
        const defaultType = Components.getType('input');
        const defaultModel = defaultType?.model;

        // INPUT
        Components.addType(this._typeName, {
            isComponent: el => el.tagName == 'H:INPUTTEXT',
            extend: 'input',
            model: {
                defaults: {
                    ...defaultModel?.prototype?.defaults,
                    tagName: 'h:inputText',
                    'custom-name': this._label,
                    draggable: 'form, form *',
                    droppable: false,
                    traits: traits,
                },
            },
            extendView: 'input',
            view: {
                tagName: () => 'input',
            }
        });
    }

}

export default new InputTextBuilder();