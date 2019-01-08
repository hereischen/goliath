import React from "react";
import _ from 'lodash';
import InventoryTable from "./InventoryTable"
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
        };
    }

    componentWillMount() {
        this.getAllInventories();
    }

    getAllInventories() {
        $.get("inventory/inventories", (data) => {
            const inventories = Inventories.buildInventoryTable(data.results);
            this.setState({
               allInventories: inventories
            });
        });
    }

    getPersonalInventories() {
        // $.get(`/inventory/inventories/?id=${this.props.currentUser}`, (data) => {
        //     console.log(data);
        //             const allInventories = this.buildInventoryTable(data.results);
        //             this.setState({
        //                allInventories: allInventories
        //             });
        //         });

        $.get("/inventory/inventories", (data) => {
            const inventories = Inventories.buildInventoryTable(data.results);
            this.setState({
               personalInventories: inventories
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
            <li className={this.state.currentTable === Inventories.TabType.ALL? 'active': ''}>
                <a data-toggle="tab" href="#all">总表</a>
            </li>
            <li className={this.state.currentTable === Inventories.TabType.PERSONAL? 'active': ''}>
                <a data-toggle="tab" href="#personal">个人表</a>
            </li>
        </ul>
            <div className="tab-content">
                {this.state.currentTable === Inventories.TabType.ALL ? (<div id="all">
                    <h2>All</h2>
                    <InventoryTable className="table" data={this.state.allInventories}/>
                </div>) : (<div id="personal">
                    <h2>Personal</h2>
                    <InventoryTable className="table" data={this.state.personalInventories}/>
                </div>)}
            </div>
            </div>)
    }
}



