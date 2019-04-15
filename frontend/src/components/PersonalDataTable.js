import React from 'react';
import InventoryTable from "./InventoryTable";
import {Pager, Alert} from 'react-bootstrap';
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
            showUpdateInvtResult: false,
            message: "",
            messageType: "",
            url: `/inventory/inventories/merchants?id=${this.props.currentUser}`
        };
        this.getPersonalInventories(this.state.url);
        this.showCreateDialog = this.showCreateDialog.bind(this);
        this.setNext = this.setNext.bind(this);
        this.setPrevious = this.setPrevious.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onSaveInventry = this.onSaveInventry.bind(this);
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

    onRowClick(id, deposit) {
        const selectedMchds = _.find(this.state.personalInventories, invt => invt.id === id);
        this.setState({
            deposit: deposit,
            showUpdateInvtDialog: true,
            selectedMerchandise: selectedMchds,
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
                        <button onClick={() => {
                            this.onRowClick(invt.id, true)
                        }}>+
                        </button>
                        <button onClick={() => {
                            this.onRowClick(invt.id, false)
                        }}>-
                        </button>
                    </td>)
            }

        ];
    }

    onInventoryCreate(result) {
        this.setState({
            showUpdateInvtDialog: false,
            showUpdateInvtResult: true,
            ...result,
        });

        this.getPersonalInventories(this.state.url);
    }

    onSaveInventry(result) {
        this.setState({
            showUpdateInvtDialog: false,
            showUpdateInvtResult: true,
            ...result,
        });

        this.getPersonalInventories(this.state.url);
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
            {this.state.showUpdateInvtResult && <Alert variant={this.state.messageType} closeLabel="close">{this.state.message}</Alert>}

            <PersonalInventoryCreateDialog show={this.state.showCreateInvtDialog}
                                           closeDialog={() => {this.setState( { showCreateInvtDialog: false});}}
                                           currentUser={this.props.currentUser}
                                           onInventoryCreate={this.onInventoryCreate}/>

            <PersonalInventoryUpdateDialog deposit={this.state.deposit}
                                           show={this.state.showUpdateInvtDialog}
                                           closeDialog={() => this.setState({showUpdateInvtDialog: false})}
                                           onSaveInventry={this.onSaveInventry}
                                           selectedMerchandise={this.state.selectedMerchandise}
                                           currentUser={this.props.currentUser}/>
        </div>);
    }
}
