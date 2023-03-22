import {IPostTicketData, IVipTicket, TicketType} from '../../models/ticket/ticket';
import {initTicketElementTemplate} from '../../templates/ticketInfo';
import {postTicketData} from '@rest/tickets';

let ticketPostInstance;

export function initTicketInfo(ticket: TicketType | IVipTicket): void {
  const targetElement = document.querySelector('.ticket-info');

  const ticketDescription = ticket?.description;
  const ticketOperator = ticket?.tourOperator;
  let vipClientType;
  if ("vipStatus" in ticket) {
    vipClientType = ticket.vipStatus;
  }

  const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
  let ticketElemTemplate;

  ticketElemsArr.forEach((el, i) => {
    ticketElemTemplate += initTicketElementTemplate(el, i);
  });

  targetElement.innerHTML = ticketElemTemplate;
}

export function initUserData():void {
  const userInfo = document.querySelectorAll('.user-info > p');
  let userInfoObj;
  userInfo.forEach((el) => {
    const inputDataName = el.getAttribute('data-name');
    if (inputDataName) {
      const inputElems = el.querySelector('input');
      userInfoObj[inputDataName] = inputElems.value;
    }
  });
}

export function initPostData(data: IPostTicketData): void {
  initUserData();
  postTicketData(data).then((data) => {
    if (data.success) {

    }
  })
}

export function registerConfirmButton(): void {
  const targetEl = document.getElementById('accept-order-button');
  if (targetEl) {
    targetEl.addEventListener('click', () => {
      initPostData(ticketPostInstance);
    });
  }
}
