import React from 'react';
import InventoryTable from "./InventoryTable";
import Dialog from "react-bootstrap-dialog";
import Pager from 'react-bootstrap/lib/Pagination';
import utils from "../utils/utils";

export default class AllInvtDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            // "count": 2,
            next: null,
            previous: null,
            allInventories: [],
            url : "/inventory/inventories"
        };
        this.getAllInventories();
        this.showDetailsDialog = this.showDetailsDialog.bind(this);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);
    }

    getAllInventories() {
            $.get(this.state.url, (data) => {
            const inventories = AllInvtDataTable.buildAllInventoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                allInventories: inventories
            });
        });
    }

    static buildAllInventoryTable(inventories) {
        return _.map(inventories, invt => {
            return {
                brand: invt.merchandise.brand.brand,
                category: invt.merchandise.category.category,
                id: invt.merchandise.id,
                code: invt.merchandise.code,
                remarks: invt.merchandise.remarks,
                quantity: invt.quantity
            }
        });
    }

    setNext() {
        this.setState({
            url : this.state.next
        });
        this.getAllInventories();
    }

    setPrevious() {
        this.setState({
            url : this.state.previous
        });
        this.getAllInventories();
    }

    showDetailsDialog() {
        this.dialog.show({
            title: '库存详情',
            body: (<div>库存详情
                   </div>),
            bsSize: 'large',
            onHide: (dialog) => {
                dialog.hide();
                console.log('closed by clicking background.');
            },

            actions: [
                Dialog.CancelAction(() => {
                    console.log("cancel click")
                }),
                Dialog.OKAction(() => {
                    console.log("ok click")
                })
            ],
        })
    }

    render() {
        return (<div id="all">
            <button className="btn btn-default" onClick={this.showDetailsDialog}>新建库存</button>
            <InventoryTable className="table"
                            data={this.state.allInventories}
                            columns={[
                                {text: "品牌", selector: "brand"},
                                {text: "品类", selector: "category"},
                                {text: "商品编码", selector: "code"},
                                {text: "数量", selector: "quantity"},
                                {text: "详情", selector: "details"}
                            ]}
            />
            <Pager>
                <Pager.Item onClick={this.setPrevious}>上一页</Pager.Item>
                <Pager.Item onClick={this.setNext}>下一页</Pager.Item>
            </Pager>
            <Dialog ref={(el) => {
                this.dialog = el
            }}/>
        </div>);
    }
}
