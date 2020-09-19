import { EventEmitter } from 'events';
import {updateStatistic} from "../service/statistic";
import {IOrderDocument} from "../model";
import {OrderAction} from "../common";


class OrderEventEmitter extends EventEmitter {
    constructor() {
        super();
    }

    afterOrderProcess(
        order: IOrderDocument,
        action: OrderAction
    ) {
        this.emit('afterOrderProcess', order, action);
    }
}

export const orderEventEmitter = new OrderEventEmitter();

orderEventEmitter.on('afterOrderProcess', (order, action) =>
    updateStatistic(order, action)
);
