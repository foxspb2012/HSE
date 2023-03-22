import {getTicketById} from "@rest/tickets";
import '@myCss'; // добавлена новая ссылка - ссылка ведет на один файл
import '@assets/styles/tickets.scss'
import {IVipTicket, TicketType, ITicket} from "../../models/ticket/ticket";
import {initFooterTitle, initHeaderTitle} from "@services/general/general";
import {initTicketInfo, registerConfirmButton} from "@services/tickets/ticket";

let ticketInstance: TicketType;

// init main  data
initApp();
registerConfirmButton();

function initApp(): void {
  const ticketData: Promise<IVipTicket[]> = getTicketById<IVipTicket>('someId');
  ticketData.then((data): void => {
    ticketInstance = data[0];
    const ticketName = typeof ticketInstance?.name === "string" ? ticketInstance?.name : '';
    initHeaderTitle(ticketName, 'h3');
    initFooterTitle('Туры по всему миру', 'h2');
    initTicketInfo(ticketInstance);
  });
}
