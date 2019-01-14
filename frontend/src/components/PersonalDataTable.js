import React from 'react';
import InventoryTable from "./InventoryTable";
import utils from "../utils/utils";
import InformationDialog from "./InformationDialog";

export default class PersonalDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            personalInventories: [],
            showCreateInvtDialog: false,
        };
        this.getPersonalInventories();
        this.showCreateDialog = this.showCreateDialog.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.saveInventory = this.saveInventory.bind(this);
    }

    getPersonalInventories() {
            $.get(`/inventory/inventories/merchants?id=${this.props.currentUser}`, (data) => {
            const inventories = PersonalDataTable.buildPersonalInventoryTable(data.results);
            this.setState({
                personalInventories: inventories
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

    showCreateDialog() {
        this.setState( {showCreateInvtDialog: true});
    }

    getSaveDialogBody() {

    }

    saveInventory() {

    }

    cancelSave() {
        this.setState( {showCreateInvtDialog: false});
    }
    render() {
        const saveDialogBody = this.getSaveDialogBody();
        return (<div id="personal">
            <button className="btn btn-default" onClick={this.showCreateDialog}>新建库存</button>
            <InventoryTable className="table"
                            data={this.state.personalInventories}
                            columns={[
                                {text: "品牌", selector: "brand"},
                                {text: "品类", selector: "category"},
                                {text: "商品编码", selector: "code"},
                                {text: "数量", selector: "quantity"},
                                {text: "价格", selector: "price"},
                                {text: "修改时间", selector: "modifiedDate"},
                            ]}
            />
            <InformationDialog show={this.state.showCreateInvtDialog}
                               onConfirm={this.saveInventory}
                               onCancel={this.cancelSave}
                               body={saveDialogBody}
                               title="新建库存"/>
            {/*<Dialog ref={(el) => {*/}
                {/*this.dialog = el*/}
            {/*}}/>*/}
        </div>);
    }
}
