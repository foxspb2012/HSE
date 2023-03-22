import {ITours} from "../models/tours";

// указать возвращающий тип и тип для параметра
export function getTourTemplate(obj:ITours, i: number) :string {
  return(
    ` <div  data-tour-item-index=${i} class="tour-block">
           <h2>${obj.name}</h2>
           <img class='tour-pic' src="${obj.img}"/>
           <div class="ticket-description">${obj.description}</div>
           <p>${obj.price}</p>
       </div>
    `);
}
