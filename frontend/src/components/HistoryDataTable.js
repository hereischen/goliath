import React from 'react';
import utils from "../utils/utils";
import InventoryTable from "./common/InventoryTable";

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
            url: `/history/histories?current_merchant_id=${this.props.currentUser}`,
            pageSize: 10,
            page: 0
        };
        this.getHistories();
        this.onFetchData = this.onFetchData.bind(this);
    }

    getHistories() {
        $.get(`${this.state.url}&page_size=${this.state.pageSize}&page=${this.state.page + 1}`, (data) => {
            const histories = HistoryDataTable.buildHistoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                histories: histories,
            });
        });
    }

    static buildHistoryTable(histories) {
        return _.chain(histories)
            .orderBy(his => his.id)
            .map( hs => {
            return {
                id: hs.id,
                type: hs.type,
                info: hs.info,
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
        })
            .value();
    }

    getColumns() {
        return [{
            type: "text",
            title: "编号",
            selector: "id",
            }, {
            title: "类型",
            type: "action",
            selector: "type",
            renderContent: (row) => {
                return (`${HistoryDataTable.TYPE[row.value]}`)
            }
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
        }, {
            title: "发起人",
            selector: "initiator",
            type: "text",
        }, {
            title: "时价",
            selector: "price",
            type: "text",
        }, {
            title: "供货信息",
            selector: "info",
            type: "text",
            width: 150
        }, {
            title: "成交价",
            selector: "dealPrice",
            type: "text",
        }, {
            title: "原库存数量",
            selector: "prevQuantity",
            type: "text",
        }, {
            title: "变动数量",
            selector: "quantity",
            type: "text",
        }, {
            title: "备注",
            selector: "remarks",
            type: "text",
        }, {
            title: "创建日期",
            selector: "createdDate",
            type: "text"
        }];
    }

    onFetchData(state) {
        const url = `${this.state.url}&page_size=${state.pageSize}&page=${state.page+1}`;
        $.get(url, (data) => {
            const histories = HistoryDataTable.buildHistoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                histories: histories,
                pages: Math.ceil(data.count / state.pageSize),
                pageSize: state.pageSize,
            });
        });
    }

    render() {
        return (<div id="histories">
            <InventoryTable className="table"
                            data={this.state.histories}
                            columns={this.getColumns()}
                            showPagination={true}
                            onFetchData={this.onFetchData}
                            pages={this.state.pages}
                            pageSize={this.state.pageSize}
                            manual={true}
            />
        </div>);
    }
}
