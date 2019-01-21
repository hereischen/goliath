import React from 'react';
import InventoryTable from "./InventoryTable";
import Pager from 'react-bootstrap/lib/Pagination';
import utils from "../utils/utils";
import PersonalInventoryCreateDialog from './PersonalInventoryCreateDialog';
import PersonalInventoryUpdateDialog from './PersonalInventoryUpdateDialog';

export default class PersonalDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            next: null,
            previous: null,
            personalInventories: [],
            showCreateInvtDialog: false,
            showUpdateInvtDialog: false,
            url: `/inventory/inventories/merchants?id=${this.props.currentUser}`
        };
        this.getPersonalInventories(this.state.url);
        this.showCreateDialog = this.showCreateDialog.bind(this);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    getPersonalInventories(url) {
        if (!url) {
            console.error("url should not be null!");
            return;
        }
            $.get(url, (data) => {
            const inventories = PersonalDataTable.buildPersonalInventoryTable(data.results);
            this.setState({
                next: data.next,
                previous: data.previous,
                personalInventories: inventories,
                options: [],
            });
        });
    }

    static buildPersonalInventoryTable(inventories) {
        return _.map(inventories, invt => {
            return {
                brand: invt.merchandise.brand.brand,
                category: invt.merchandise.category.category,
                id: invt.merchandise.id,
                code: invt.merchandise.code,
                remarks: invt.merchandise.remarks,
                quantity: invt.quantity,
                price: invt.price,
                modifiedDate: utils.formatDate(invt.modified_date, "YYYY-MM-DD HH:MM"),
            }
        });
    }

    setNext() {
        this.getPersonalInventories(this.state.next);
    }

    setPrevious() {
        this.getPersonalInventories(this.state.previous);
    }

    showCreateDialog() {
        this.setState( {showCreateInvtDialog: true});
    }

    cancelSave() {
        this.setState( { showCreateInvtDialog: false});
    }

    onRowClick(id, deposit) {
        this.setState({
            deposit: deposit,
            showUpdateInvtDialog: true,
        });
    }

    getColumns() {
            return [
                {
                    type: "text",
                    title: "品牌",
                    selector: "brand",
                },
                {
                    type: "text",
                    title: "品类",
                    selector: "category",

                },
                {
                    type: "text",
                    title: "商品编码",
                    selector: "code",
                },
                {
                    type: "text",
                    title: "数量",
                    selector: "quantity",
                },
                {
                    type: "text",
                    title: "价格",
                    selector: "price",
                },
                {
                    type: "text",
                    title: "修改时间",
                    selector: "modifiedDate"
                },
                {
                    type: "action",
                    title: "操作",
                    renderContent: (invt, ind) =>
                        (<td key={ind}>
                            <button onClick={() => {this.onRowClick(invt.id, false)}}>+</button>
                            <button onClick={() => {this.onRowClick(invt.id, true)}}>-</button></td>)
                }

            ];
        }

    render() {
        return (<div id="personal">
            <button className="btn btn-default" onClick={this.showCreateDialog}>新建库存</button>
            <InventoryTable className="table"
                            data={this.state.personalInventories}
                            columns={this.getColumns()}
            />
            <Pager>
                <Pager.Item onClick={this.setPrevious} disabled={!this.state.previous}>上一页</Pager.Item>
                <Pager.Item onClick={this.setNext} disabled={!this.state.next}>下一页</Pager.Item>
            </Pager>
            <PersonalInventoryCreateDialog show={this.state.showCreateInvtDialog} closeDialog={this.cancelSave} currentUser={this.props.currentUser}/>
            <PersonalInventoryUpdateDialog deposit={this.state.deposit} show={this.state.showUpdateInvtDialog}/>
        </div>);
    }
}
