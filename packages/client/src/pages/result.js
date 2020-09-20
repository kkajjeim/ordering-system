import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Lottie from "react-lottie";
import './result.css';
import api from '../helper/api';
import HistoryCard from "../components/historyCard";
import animationData from "../lotties/loading";


const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        const response = await api('GET', '/orders');
        const { orders } = await response.json();
        this.setState({
            orders
        });
    }

    async handleCancel(id) {
        await api('POST', '/cancel', {orderid: id}, 'application/json');
        const response = await api('GET', '/orders');
        const { orders } = await response.json();
        this.setState({
            orders
        });
    }

    render() {
        return (
            <div className="result">
                {this.state.orders.length > 0
                    ? <div>
                        <div className="header"> YOUR ORDER HISTORY</div>
                        <div className="history">
                            {this.state.orders.map((o, i) =>
                                <HistoryCard
                                    id={o.id}
                                    index={i}
                                    createdAt={o.createdAt}
                                    cancelledAt={o.cancelledAt}
                                    products={o.products}
                                    total={o.total}
                                    handleCancel={this.handleCancel}
                                    key={i}
                                />
                            )}</div>
                        <Link to="/thankyou"><i className="fas fa-cat"></i></Link>
                    </div>
                    : <Lottie
                        options={lottieOptions}
                        height={400}
                        width={400}
                    />
                }
            </div>
        )
    }
}
