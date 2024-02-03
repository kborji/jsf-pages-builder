import type { Editor, Modal } from "grapesjs";
import i18next from '../i18n';
import { html, render } from 'lit-html'



export default (editor: Editor) => {


  // // Create a simple custom button that will open the modal
  // document.body.insertAdjacentHTML('afterbegin',`
  //     <button onclick="openModal()">Open Modal</button>
  // `);

  editor.TraitManager.addType('textExpression', {

    // createLabel({ label }) {
    //     return `<div>
    //       <div>Before</div>
    //       ${label}
    //       <div>After</div>
    //     </div>`;
    //   },
    // templateInput({ trait }) {
    //   return '';
    // },

    // Expects as return a simple HTML string or an HTML element
    createInput({ trait }) {
      // Here we can decide to use properties from the trait
      const traitOpts = trait.get('options') || [];
      const options = traitOpts.length ? traitOpts : [
        { id: 'url', name: 'URL' },
        { id: 'email', name: 'Email' },
      ];

      // Create a new element container and add some content
      const el = document.createElement('div');

      el.innerHTML =
        `
      <div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" id="value-input" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-sm btn-outline-secondary" type="button" id="text-exp-btn">...</button>
      </div>
      `;

      let modal: any = null; // :ModalModule | null


      // Open modal
      // const openModal = () => {
      //   modal = editor.Modal.open({
      //       title: i18next.t("traitTypes.expression.modalTitle", { ns: "traits" }), // string | HTMLElement
      //       content: ''// string | HTMLElement
      // html
      //   `
      //     <label class="silex-form__element">
      //       <input type="text" name="name" .value='xxxx'/>
      //     </label>
      //   `
      // `
      //   <form class="silex-form">
      //     <label class="silex-form__element">
      //       <input type="text" name="name" .value=${live(page.getName() || '')}/>
      //     </label>
      //     <footer>
      //       <input class="btn btn-success" type="button" @click=${e => onImport(editor, page)} value="Import from website">
      //       <input class="btn btn-default" type="button" @click=${e => editor.stopCommand(cmdOpenNewPageDialog)} value="Cancel">
      //       <input class="btn" type="submit" value="Ok">
      //     </footer>
      //   </form>
      // `

      //   });
      // };


      // old textArea
      // <div class="d-flex">
      //        <textArea class="flex-grow-1 mb-3" id="expressionInputText" type="text" name="name" placeholder="${i18next.t('traitTypes.expression.modalTextAreaPlaceholder', { ns: 'traits' })}" 
      //        @change=""
      //        ></textArea>
      //      </div>
      const openModal = () => {
        const modalElement = document.createElement('div');
        modalElement.innerHTML = `
           <form class="silex-form">
           <div class="gjs-field-wrp gjs-field-wrp--text" data-input="">
              <div class="gjs-field gjs-field-text" data-input="">
                  <textArea type="text" id="expressionInputText" 
                    placeholder="${i18next.t('traitTypes.expression.modalTextAreaPlaceholder', { ns: 'traits' })}"></textArea>
              </div>
            </div>
           <footer>
             <input class="btn btn-success" id="btn-ok" type="button" value="${i18next.t('ok', { ns: 'common' })}">

             <input class="btn" type="button" id="btn-close" value="cancel">
           </footer>
         </form>
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

        (modalElement.querySelector('#expressionInputText') as HTMLTextAreaElement).value = (el.querySelector('#value-input') as HTMLInputElement).value;
        modalElement.querySelector('#btn-ok')?.addEventListener('click', () => {
          const expressionLanguageStatement = (modalElement.querySelector('#expressionInputText') as HTMLTextAreaElement).value;
          console.log(expressionLanguageStatement);
          console.log(el);
          (el.querySelector('#value-input') as HTMLInputElement).setAttribute('value', expressionLanguageStatement);
          modal.close();
        });
        modalElement.querySelector('#btn-close')?.addEventListener('click', () => {
          modal.close();
        });

      }

      // Let's make our content interactive
      const inputsEmail = el.querySelector('.href-next__email-inputs');
      const inputType: Element | null = el.querySelector('.href-next__type');
      const button: Element | null = el.querySelector('#text-exp-btn');
      button?.addEventListener('click', ev => {
        openModal();
      });
      return el;
    },
  });

}
