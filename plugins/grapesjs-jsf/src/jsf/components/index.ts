import { Editor } from "grapesjs";
import jsfInputTextBuilder from "./JSFInputText";
import ajaxBuilder from "./ajax";
import dataTableBuilder from './datatable/dataTable';
import setToolbar from './datatable/dataTableToolbar';

export default (editor: Editor, config = {}) => {

    const componentManager = editor.DomComponents;

    jsfInputTextBuilder.create(editor);
    ajaxBuilder.create(editor);
    dataTableBuilder.create(editor);
    setToolbar(editor);
}