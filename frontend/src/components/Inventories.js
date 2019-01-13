import React from "react";
import _ from 'lodash';
import utils from '../utils/utils';
import InventoryTable from "./InventoryTable";
import PersonalDataTable from "./PersonalDataTable";

export default class Inventories extends React.Component {
    static TabType = {
        ALL: 'all',
        PERSONAL: 'personal'
    };

    constructor(props) {
        super(props);
        this.state = {
            allInventories: [],
            currentTable: Inventories.TabType.ALL,
            showCreateDialog: false
        };
        this.getAllInventories();
        this.setCurrentTableToAll = this.setCurrentTableToAll.bind(this);
        this.setCurrentTableToPersonal = this.setCurrentTableToPersonal.bind(this);
    }



    setCurrentTableToAll() {
        this.setState({currentTable: Inventories.TabType.ALL})
    }

    setCurrentTableToPersonal() {
        this.setState({currentTable: Inventories.TabType.PERSONAL})
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
                <li className={`nav-item ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}>
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
                        <InventoryTable className="table"
                                        data={this.state.allInventories}
                                        columns={[
                                            {text: "品牌", selector:"brand"},
                                            {text: "品类", selector:"category"},
                                            {text: "商品编码", selector:"code"},
                                            {text: "数量", selector:"quantity"},
                                        ]}
                        />
                    </div>)
                        :(<PersonalDataTable currentUser={this.props.currentUser}/>)
                    }
            </div>
        </div>)
    }
}



