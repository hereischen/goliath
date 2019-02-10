import React from "react";
import InventoryTable from "./InventoryTable";
import AllInvtDataTable from "./AllInvtDataTable";
import PersonalDataTable from "./PersonalDataTable";

export default class Inventories extends React.Component {
    static TabType = {
        ALL: 'all',
        PERSONAL: 'personal'
    };

    constructor(props) {
        super(props);
        this.state = {
            currentTable: Inventories.TabType.ALL,
        };
        this.setCurrentTableToAll = this.setCurrentTableToAll.bind(this);
        this.setCurrentTableToPersonal = this.setCurrentTableToPersonal.bind(this);
    }

    setCurrentTableToAll() {
        this.setState({currentTable: Inventories.TabType.ALL})
    }

    setCurrentTableToPersonal() {
        this.setState({currentTable: Inventories.TabType.PERSONAL})
    }

    render() {
        return (<div>
            <ul className="nav nav-tabs">
                <li className={`nav-item ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}>
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}
                       data-toggle="tab"
                       href='#all'
                       onClick={() => this.setState({currentTable: Inventories.TabType.ALL})}>总库存</a>
                </li>
                <li className={this.state.currentTable === Inventories.TabType.PERSONAL ? 'active' : ''}>
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.ALL ? 'active' : ''}`}
                       data-toggle="tab"
                       href="#personal"
                       onClick={() => this.setState({currentTable: Inventories.TabType.PERSONAL})}>个人库存</a>
                </li>
            </ul>
                <div className="tab-content">
                    {this.state.currentTable === Inventories.TabType.ALL ?
                        (<AllInvtDataTable currentUser={this.props.currentUser}/>)
                        :(<PersonalDataTable currentUser={this.props.currentUser}/>)
                    }
            </div>
        </div>)
    }
}



