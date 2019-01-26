import React from 'react';
import InventoryTable from "./InventoryTable";
import RentDialog from './RentDialog';
import Pager from 'react-bootstrap/lib/Pagination';

export default class AllInvtDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            next: null,
            previous: null,
            allInventories: [],
            url : "/inventory/inventories",
            depositTableData: [],
            showDepositDialog: false,
            selectedMerchandiseId: 0,
        };
        this.getAllInventories(this.state.url);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
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
                showDepositDialog: true,
                selectedMerchandiseId: merchandise.id,
            });
        });
    }

    buildDepositData(data) {
        return _(data)
            .filter(mcht => mcht.merchant.id !== this.props.currentUser)
            .map((mcht => {
           return  {
               merchantName: mcht.merchant.name,
               merchantId: mcht.merchant.id,
               mobile: mcht.merchant.mobile,
               email: mcht.merchant.email,
               dingding: mcht.merchant.dingding,
               address: mcht.merchant.address,
               code: mcht.merchandise.code,
               brand: mcht.merchandise.brand.brand,
               category: mcht.merchandise.category.category,
               quantity: mcht.quantity,
               id: mcht.id,
            }
        })).value();
    }

    getColumns() {
        return [{
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
            title: "详情",
            selector: "details",
            type: "text"
        }, {
            title: "操作",
            type: "action",
            renderContent: (merchandise, ind) =>
                        (<td key={ind}>
                            <button onClick={() => {this.onRowClick(merchandise)}}>...</button>
                        </td>)
        }]
    }

    onCloseDialog() {
        this.setState({showDepositDialog: false});
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
            <RentDialog depositTableData= {this.state.depositTableData}
                        show={this.state.showDepositDialog}
                        onClose={this.onCloseDialog}
                        currentUser={this.props.currentUser}
                        selectedMerchandiseId={this.state.selectedMerchandiseId}
            />
        </div>);
    }
}
