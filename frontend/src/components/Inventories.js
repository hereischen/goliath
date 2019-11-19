import React from "react";
import AllInvtDataTable from "./AllInvtDataTable";
import PersonalDataTable from "./PersonalDataTable";
import HistoryDataTable from "./HistoryDataTable";
import {Tabs} from 'react-bootstrap';

export default class Inventories extends React.Component {
    static TabType = {
        ALL: 'all',
        PERSONAL: 'personal',
        HISTORY: 'history'
    };

    constructor(props) {
        super(props);
        this.state = {
            currentTable: Inventories.TabType.ALL,
        };
        this.setCurrentTableToAll = this.setCurrentTableToAll.bind(this);
        this.setCurrentTableToPersonal = this.setCurrentTableToPersonal.bind(this);
        this.setCurrentTableToHistory = this.setCurrentTableToHistory.bind(this);
        this.switchDataTable = this.switchDataTable.bind(this);

    }

    setCurrentTableToAll() {
        this.setState({currentTable: Inventories.TabType.ALL})
    }

    setCurrentTableToPersonal() {
        this.setState({currentTable: Inventories.TabType.PERSONAL})
    }

    setCurrentTableToHistory() {
        this.setState({currentTable: Inventories.TabType.HISTORY})
    }

    switchDataTable(){
        switch (this.state.currentTable) {
            case Inventories.TabType.ALL:
                return <AllInvtDataTable currentUser={this.props.currentUser}/>;
            case Inventories.TabType.PERSONAL:
                return <PersonalDataTable currentUser={this.props.currentUser}/>;
            case Inventories.TabType.HISTORY:
                return <HistoryDataTable currentUser={this.props.currentUser}/>;
            default:
                return <AllInvtDataTable currentUser={this.props.currentUser}/>;
        }
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
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.PERSONAL ? 'active' : ''}`}
                       data-toggle="tab"
                       href="#personal"
                       onClick={() => this.setState({currentTable: Inventories.TabType.PERSONAL})}>个人库存</a>
                </li>
                <li className={this.state.currentTable === Inventories.TabType.HISTORY ? 'active' : ''}>
                    <a className={`nav-link ${this.state.currentTable === Inventories.TabType.HISTORY ? 'active' : ''}`}
                       data-toggle="tab"
                       href="#history"
                       onClick={() => this.setState({currentTable: Inventories.TabType.HISTORY})}>库存历史</a>
                </li>
            </ul>
            <div className="tab-content">
               {this.switchDataTable()}
            </div>
        </div>)
    }
}



