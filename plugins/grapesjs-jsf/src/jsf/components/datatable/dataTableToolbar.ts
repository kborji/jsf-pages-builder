import type { Editor, Modal } from "grapesjs";
import i18next from '../../../i18n';
import { html, render } from 'lit-html'
import { FieldMetadata } from "./models/field-metadata";
import { ColumnMetadata } from "./models/column-metadata";


function addToolbar(editor: Editor) {
  editor.Commands.add('open-datatable-modal-cmd', {
    run: (editor) => {
      // alert('za');
    }
  })
  editor.on("component:selected", (component) => {
    const newTool = {
      icon: 'fa fa-plus-square',
      title: 'WAZWAZ',
      commandName: 'open-datatable-modal-cmd',
      id: 'dataTableToolbarId'
    };
    const defaultToolbar = component.get('toolbar');
    const alreadyExists = defaultToolbar.filter((t: any) => t.command === newTool.commandName);
    if (!alreadyExists) {
      defaultToolbar.unshift({
        id: newTool.id,
        attributes: { class: newTool.icon, title: newTool.title },
        command: newTool.commandName,
      });
      console.log(defaultToolbar);
      console.log('aaaa');
      // component.setToolbar(defaultToolbar);
      component.set('toolbar', defaultToolbar);
    }
  })
}




let modal: any = null; // :ModalModule | null

export default (editor: Editor) => {
  editor.Commands.add('open-datatable-modal-cmd', {
    run: (editor) => { openModal(); }
  });

  editor.on("component:selected", (component) => {
    const newTool = {
      icon: 'fa fa-gear',
      title: 'WAZWAZ',
      commandName: 'open-datatable-modal-cmd',
      id: 'dataTableToolbarId'
    };
    const defaultToolbar = component.get('toolbar');

    const alreadyExists = defaultToolbar.filter((t: any) => t.command === newTool.commandName);
    // console.log(!alreadyExists);
    // alert('wazwaz');

    if (!alreadyExists || alreadyExists?.length == 0) {
      defaultToolbar.unshift({
        id: newTool.id,
        attributes: { class: newTool.icon, title: newTool.title },
        command: newTool.commandName,
      });
      console.log(defaultToolbar);
      console.log('aaaa');
      // component.setToolbar(defaultToolbar);
      component.set('toolbar', defaultToolbar);
    }
  });

  // }





  const openModal = () => {
    const metadataArray: FieldMetadata[] = [
      { name: 'theStrn1', arabicLabel: 'النص  1', englishLabel: 'engLbl1', type: 'string' },
      { name: 'theStrn2', arabicLabel: 'النص  2', englishLabel: 'engLbl2', type: 'string' },
      { name: 'theStrn3', arabicLabel: 'النص  3', englishLabel: 'engLbl3', type: 'string' },
      { name: 'theIntr1', arabicLabel: 'الرقم 1', englishLabel: 'engLbl4', type: 'integer' },
      { name: 'theIntr2', arabicLabel: 'الرقم 2', englishLabel: 'engLbl5', type: 'integer' },
      { name: 'theBool1', arabicLabel: 'منطقية1', englishLabel: 'engLbl6', type: 'boolean' },
      { name: 'theBool2', arabicLabel: 'منطقية2', englishLabel: 'engLbl7', type: 'boolean' }
    ];
    const columns: ColumnMetadata[] = [

    ];
    const modalElement = document.createElement('div');
    // <div class="gjs-field gjs-field-text d-flex justify-content-space-between" data-input="">
    //           <input type="text" placeholder="Name"></input>
    //           <input type="text" placeholder="Arabic Label"></input>
    //           <input type="text" placeholder="English Label"></input>
    //           <input type="text" placeholder="Type"></input>
    //       </div>
    modalElement.innerHTML = `
       <form class="silex-form">
       <div class="gjs-field-wrp gjs-field-wrp--text" data-input="">
       ${metadataArray.map(element =>
      `<div class="gjs-field gjs-field-text d-flex justify-content-space-between" data-input="">
      <input type="text" placeholder="Name"></input>
      <input type="text" placeholder="Arabic Label"></input>
      <input type="text" placeholder="English Label"></input>
      <input type="checkbox" placeholder="THE CHECK">
      </input>
      <select placeholder="za zelect" >
        <options>
          <option key="1" value="11" label="111">
          <option key="1" value="22" label="222">
        </options>
      </select>
  </div>`)
      }
  </div>
    < footer >
    <input class="btn btn-success" id = "btn-ok" type = "button" value = "${i18next.t('ok', { ns: 'common' })}" >

      <input class="btn" type = "button" id = "btn-close" value = "cancel" >
        </footer>
        < /form>
          `;

    modal = editor.Modal.open({
      title: i18next.t("traitTypes.expression.modalTitle", { ns: "traits" }), // string | HTMLElement
      content: modalElement// string | HTMLElement
    })
      .onceClose((clb: Backbone.EventHandler) => {
        console.log('this is onceClose event handler');
      })
      ;
    const parser = new DOMParser();
    console.log(modalElement);


    modalElement.querySelector('#btn-close')?.addEventListener('click', () => {
      modal.close();
    });

  }


  //  // Let's make our content interactive
  //  const inputsEmail = el.querySelector('.href-next__email-inputs');
  //  const inputType: Element | null = el.querySelector('.href-next__type');
  //  const button: Element | null = el.querySelector('#text-exp-btn');
  //  button?.addEventListener('click', ev => {
  //    openModal();
  //  });
  //  return el;
  //    }
}