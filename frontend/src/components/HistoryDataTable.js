import React from 'react';
import utils from "../utils/utils";
import {Pager} from 'react-bootstrap';
import InventoryTable from "./InventoryTable";

export default class HistoryDataTable extends React.Component{
    static TYPE = {
        0: '存入',
        1: '自取出',
        2: '调配'
    };

    constructor (props) {
        super(props);
        this.state = {
            count:0,
            next: null,
            previous: null,
            histories: [],
            url: `/history/histories?current_merchant_id=${this.props.currentUser}`
        };
        this.getHistories(this.state.url);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);

    }

    getHistories(url) {
        if (!url) {
            console.error("url should not be null!");
            return;
        }
        $.get(url, (data) => {
            const histories = HistoryDataTable.buildHistoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                histories: histories,
            });
        });
    }

    static buildHistoryTable(histories) {
        return _.map(histories, hs => {
            return {
                id: hs.id,
                type: hs.type,
                brand: hs.inventory.merchandise.brand.brand,
                category: hs.inventory.merchandise.category.category,
                code: hs.inventory.merchandise.code,
                model: hs.inventory.merchandise.model,
                owner: hs.inventory.merchant.name,
                initiator: hs.initiator.name,
                price: hs.price,
                dealPrice: hs.deal_price,
                prevQuantity: hs.prev_quantity,
                quantity: hs.quantity,
                remarks: hs.remarks,
                createdDate: utils.formatDate(hs.created_date, "YYYY-MM-DD HH:MM"),
            }
        });
    }

    setNext() {
        this.getHistories(this.state.next);
    }

    setPrevious() {
        this.getHistories(this.state.previous);
    }

    getColumns() {
        return [{
            title: "类型",
            type: "action",
            renderContent: (hs, ind) => (<td className="ellipsis" style={{maxWidth : "200px"}} key={ind}>{HistoryDataTable.TYPE[hs.type]}</td>)
        },{
            title: "品牌",
            selector: "brand",
            type: "text",
        }, {
            title: "品类",
            selector: "category",
            type: "text",
        }, {
            title: "商品编码",
            selector: "code",
            type: "text",

        }, {
            title: "型号",
            selector: "model",
            type: "text",
        }, {
            title: "库存所有人",
            selector: "owner",
            type: "text",
            width: 200,
        }];
    }

    render() {
        return (<div id="histories">
            <InventoryTable className="table"
                            data={this.state.histories}
                            columns={this.getColumns()}
            />
            <Pager>
                <Pager.Item onClick={this.setPrevious} disabled={!this.state.previous}>上一页</Pager.Item>
                <Pager.Item onClick={this.setNext} disabled={!this.state.next}>下一页</Pager.Item>
            </Pager>
        </div>);
    }
}
