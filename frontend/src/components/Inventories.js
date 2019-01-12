import React from "react";
import _ from 'lodash';
import InventoryTable from "./InventoryTable";
import Dialog from 'react-bootstrap-dialog';

export default class Inventories extends React.Component {
    static TabType = {
        ALL: 'all',
        PERSONAL: 'personal'
    };

    constructor(props) {
        super(props);
        this.state = {
            allInventories: [],
            personalInventories: [],
            currentTable: Inventories.TabType.ALL,
            showCreateDialog: false
        };
        this.getAllInventories();
        this.getPersonalInventories();
        this.setCurrentTableToAll = this.setCurrentTableToAll.bind(this);
        this.setCurrentTableToPersonal = this.setCurrentTableToPersonal.bind(this);
        this.showCreateDialog = this.showCreateDialog.bind(this);
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

    setCurrentTableToAll() {
        this.setState({currentTable: Inventories.TabType.ALL})
    }

    setCurrentTableToPersonal() {
        this.setState({currentTable: Inventories.TabType.PERSONAL})
    }

    getPersonalInventories() {
            $.get(`/inventory/inventories/merchants?id=${this.props.currentUser}`, (data) => {
            const inventories = Inventories.buildInventoryTable(data.results);
            this.setState({
                personalInventories: inventories
            });
        });
    }

    getAllInventories() {
        $.get("inventory/inventories", (data) => {
            const inventories = Inventories.buildInventoryTable(data.results);
            this.setState({
                allInventories: inventories
            });
        });
    }

    static buildInventoryTable(inventories) {
        return _.map(inventories, invt => {
            return {
                brand: invt.merchandise.brand.brand,
                category: invt.merchandise.category.category,
                id: invt.merchandise.id,
                code: invt.merchandise.code,
                remarks: invt.merchandise.remarks,
                quantity: invt.quantity,
            }
        });
    }

    render() {
        return (<div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}
                       data-toggle="tab"
                       href='#all'
                       onClick={() => this.setState({currentTable: Inventories.TabType.ALL})}>总表</a>
                </li>
                <li className={this.state.currentTable === Inventories.TabType.PERSONAL ? 'active' : ''}>
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}
                       data-toggle="tab"
                       href="#personal"
                       onClick={() => this.setState({currentTable: Inventories.TabType.PERSONAL})}>个人表</a>
                </li>
            </ul>
            <div className="tab-content">
                {this.state.currentTable === Inventories.TabType.ALL ?
                    (<div id="all">
                    <span>All</span>
                    <InventoryTable className="table" data={this.state.allInventories}/>
                </div>)
                    :(<div id="personal">
                        <span>Personal</span>
                        <button className="btn btn-default float-right" onClick={this.showCreateDialog}>新建库存</button>
                        <InventoryTable className="table" data={this.state.personalInventories}/>
                        <Dialog ref={(el) => { this.dialog = el }}/>
                </div>)}
            </div>
        </div>)
    }
}



