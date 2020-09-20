import React, {Component} from 'react';
import './order.css';
import SubmitButton from "../components/submitButton";
import api from '../helper/api';
import { alertMessage } from '../helper/message';
import menu from "../helper/menu";
import MenuCard from "../components/menuCard";
import SelectedItemRow from "../components/selectedItemRow";

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: menu,
            order : {
                products: [],
                total: 0,
                subtotal: 0,
                fees: 1000
            }
        };
        this.handleItem = this.handleItem.bind(this);
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBill(products) {
        let subtotal = 0;
        products.forEach(p => (
            subtotal += (p.price * p.quantity)
        ));

        const total = subtotal + this.state.order.fees;
        return { total, subtotal };
    }

    handleAddToBasket(i) {
        let products = this.state.order.products.slice();
        let menu = this.state.menu.slice();

        const target = menu[i];
        const selectedNames = products.map(p => p.name);
        const isSelected = selectedNames.includes(target.name);

        if(isSelected) return;

        products.push({
            name: target.name,
            price: target.price,
            quantity: 1
        });

        const { total, subtotal } = this.getBill(products);

        this.setState(prevState => ({
            order: {
                ...prevState.order,
                products,
                total,
                subtotal
            }
        }));
    }

    handleItem(action, i) {
        let products = this.state.order.products.slice();
        let target = products[i];

        if (action === 'plus') {
            target.quantity ++;
        } else if (action === 'minus' && target.quantity > 1) {
            target.quantity --;
        } else if (action === 'delete') {
            products.splice(i, 1);
        }

        const { total, subtotal } = this.getBill(products);

        this.setState(prevState => ({
            order: {
                ...prevState.order,
                products,
                total,
                subtotal
            }
        }));
    };

    async handleSubmit(e) {
        if (this.state.order.products.length === 0)
            return;

        try {
            await api('POST', '/order', this.state.order, 'application/json');
            this.props.history.push('/result');
        } catch(e) {
            alert(alertMessage.common);
        }
    };

    render () {
        return (
            <div className="order">
                <div className="menu">
                    {this.state.menu.map((m, i) =>
                        <MenuCard
                            image={m.image}
                            name={m.name}
                            price={m.price}
                            handleAddToBasket={this.handleAddToBasket}
                            i={i}
                            key={i}
                        />)
                    }
                </div>
                <div className="basket">
                    <div className="items">
                        {this.state.order.products.map((p, i) =>
                            <SelectedItemRow
                                name={p.name}
                                quantity={p.quantity}
                                price={p.price}
                                handleItem={this.handleItem}
                                i={i}
                                key={i}
                            />)
                        }
                    </div>
                    <div className="line"></div>
                    <div className="bill">
                        <div className="bill_subtotal">
                            subtotal : {this.state.order.subtotal}</div>
                        <div className="bill_fees">
                            fees : {this.state.order.fees}</div>
                        <div className="bill_total">
                            total : {this.state.order.total} ₩</div>
                    </div>
                    <div onClick={this.handleSubmit}>
                        <SubmitButton text="Order now"/>
                    </div>
                </div>
            </div>
        )
    }
}
