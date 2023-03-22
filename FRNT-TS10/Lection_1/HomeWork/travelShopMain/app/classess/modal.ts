export class Modal {
  private readonly id: string;
  public static modals: any[] = [];

  constructor(id: string = null) {
    const findModal = Modal.modals.find(item => item.id === id);
    if (findModal) {
      Modal.removeById(id);
    }
    Modal.modals.push(this);
    this.id = id || (Math.random() + Modal.modals.length).toString();
  }

  public open(template: string): void {
    const divWrap = document.createElement('div');
    divWrap.innerHTML = template;
    divWrap.id = this.id;
    divWrap.setAttribute('modal-id', this.id);
    divWrap.classList.add('modal-element');
    divWrap.addEventListener('click', this.closeModalHandler);
    window.addEventListener('keydown', this.closeModalWindowHandler);
    document.body.appendChild(divWrap);
  }

  public remove(): void {
    const modalEl = document.getElementById(this.id) as HTMLElement;
    if (modalEl) {
      modalEl.removeEventListener('click', this.closeModalHandler);
      window.removeEventListener('keydown', this.closeModalWindowHandler);
      modalEl.parentNode.removeChild(modalEl);
    }
  };

  public static removeById(id: string = null): void {
    let modalId = id;

    const findEl = Modal.modals.find(item => item.id === modalId);
    if (findEl) {
      findEl.remove();
      Modal.modals = Modal.modals.filter(el => el.id !== modalId);
    } else {
      if (Array.isArray(Modal.modals)) {
        const lastEl = Modal.modals.pop();
        if (lastEl) {
          lastEl.remove();
        }
      }
    }
  }

  private closeModalHandler = (evt: Event) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('close-modal')) {
      this.remove();
    }
  }

  private closeModalWindowHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      const modalEl = document.querySelector('.modal-element') as HTMLElement;
      if (modalEl) {
        modalEl.parentNode.removeChild(modalEl);
      }
    }
  }
}

