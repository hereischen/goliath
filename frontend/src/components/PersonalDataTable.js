import React from 'react';
import InventoryTable from "./InventoryTable";
import Dialog from "react-bootstrap-dialog";
import utils from "../utils/utils";

export default class PersonalDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            personalInventories: [],
        };
        this.getPersonalInventories();
        this.showCreateDialog = this.showCreateDialog.bind(this);
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
                modifiedDate: utils.formatDate(invt.modified_date, "YYYY-MM-DD HH:MM"),
            }
        });
    }

    showCreateDialog() {
        this.dialog.show({
            title: '添加库存',
            body: (<div>想睡觉了。。。。明天再写
                <input type="text" placeholder="睡觉睡觉😪"/>
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
        return (<div id="personal">
            <button className="btn btn-default" onClick={this.showCreateDialog}>新建库存</button>
            <InventoryTable className="table"
                            data={this.state.personalInventories}
                            columns={[
                                {text: "品牌", selector: "brand"},
                                {text: "品类", selector: "category"},
                                {text: "商品编码", selector: "code"},
                                {text: "数量", selector: "quantity"},
                                {text: "修改时间", selector: "modifiedDate"},
                            ]}
            />
            <Dialog ref={(el) => {
                this.dialog = el
            }}/>
        </div>);
    }
}