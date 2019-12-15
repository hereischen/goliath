import React from 'react';
import InventoryTable from "./common/InventoryTable";
import WithdrawDialog from './WithdrawDialog';
import {Pager, Alert} from 'react-bootstrap';

export default class AllInvtDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            next: null,
            previous: null,
            allInventories: [],
            url : "/inventory/inventories",
            depositTableData: [],
            showWithdrawDialog: false,
            selectedMerchandiseId: 0,
            showWithdrawResultAlert: false,
        };
        this.getAllInventories(this.state.url);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onConfirmWithDraw = this.onConfirmWithDraw.bind(this);
    }

    getAllInventories(url) {
        if (!url) {
            console.error("url should not be null!");
            return;
        }
        $.get(url, (data) => {
            const inventories = AllInvtDataTable.buildAllInventoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                allInventories: inventories,
                showWithdrawDialog: false,
            });
        });
    }

    static buildAllInventoryTable(inventories) {
        return _.chain(inventories)
            .orderBy(invt => invt.merchandise.id)
            .map(invt => {
            return {
                brand: invt.merchandise.brand.brand,
                category: invt.merchandise.category.category,
                id: invt.merchandise.id,
                code: invt.merchandise.code,
                remarks: invt.merchandise.remarks,
                quantity: invt.quantity,
                certification: invt.merchandise.certification,
                delivery_time: invt.merchandise.delivery_time,
                spare_parts: invt.merchandise.spare_parts,
                model: invt.merchandise.model,
                after_sales: invt.merchandise.after_sales,
            }})
            .value();
    }

    setNext() {
        this.getAllInventories(this.state.next);
    }

    setPrevious() {
        this.getAllInventories(this.state.previous);
    }

    onRowClick(merchandise) {
        $.get(`inventory/inventories/merchandise?id=${merchandise.id}`, (data) => {
            const depositTableData = this.buildDepositData(data.results);
            this.setState({
                depositTableData: depositTableData,
                showWithdrawDialog: true,
                selectedMerchandiseId: merchandise.id,
            });
        });
    }

    buildDepositData(data) {
        return _(data)
            .filter(mcht => mcht.merchant.id !== this.props.currentUser)
            .map((mcht => {
                return {
                    merchantName: mcht.merchant.name,
                    merchantId: mcht.merchant.id,
                    mobile: mcht.merchant.mobile,
                    email: mcht.merchant.email,
                    dingding: mcht.merchant.dingding,
                    address: mcht.merchant.address,
                    quantity: mcht.quantity,
                    price: mcht.price,
                    id: mcht.id,
                }
            }))
            .value();
    }

    getColumns() {
        return [{
            title: "编号",
            selector: "id",
            type: "text",
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
            title: "数量",
            selector: "quantity",
            type: "text"
        }, {
            title: "型号",
            selector: "model",
            type: "text"
        }, {
            title: "认证",
            selector: "certification",
            type: "text"
        }, {
            title: "售后服务",
            type: "action",
            selector: "after_sales",
            renderContent: (row) => `${row.value} 年`,
        }, {
            title: "属性",
            selector: "spare_parts",
            type: "text"
        },{
            title: "到货时间",
            type: "action",
            selector: "delivery_time",
            renderContent: (row) => (`${row.value} 天`)
        },
            {
            title: "操作",
            type: "action",
            renderContent: (row) =>
            {
                return (
                    <button onClick={() => {this.onRowClick(row.original)}}>...</button>
                )
            }
        }
        ]
    }

    onConfirmWithDraw(result) {
        this.setState({
            showWithdrawResultAlert: true,
            ...result
        });

        this.getAllInventories(this.state.url);
    }

    onCloseDialog() {
        this.setState({showWithdrawDialog: false});
    }
    render() {
        return (<div id="all">
            <InventoryTable className="table"
                            data={this.state.allInventories}
                            columns={this.getColumns()}
            />
            <Pager>
                <Pager.Item onClick={this.setPrevious} disabled={!this.state.previous}>上一页</Pager.Item>
                <Pager.Item onClick={this.setNext} disabled={!this.state.next}>下一页</Pager.Item>
            </Pager>
            <WithdrawDialog depositTableData= {this.state.depositTableData}
                            show={this.state.showWithdrawDialog}
                            onClose={this.onCloseDialog}
                            onConfirm={this.onConfirmWithDraw}
                            currentUser={this.props.currentUser}
                            selectedMerchandiseId={this.state.selectedMerchandiseId}
            />
            {this.state.showWithdrawResultAlert && <Alert variant={this.state.messageType} closeLabel="close">{this.state.message}</Alert>}
        </div>);
    }
}
