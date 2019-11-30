import React from "react";
import {Tabs, Tab} from "react-bootstrap";
import AllInvtDataTable from "./AllInvtDataTable";
import PersonalDataTable from "./PersonalDataTable";
import HistoryDataTable from "./HistoryDataTable";

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
        return (
            <Tabs defaultActiveKey="all">
                <Tab eventKey="all" title="总库存" tabClassName="nav-link">
                    <AllInvtDataTable currentUser={this.props.currentUser}/>
                </Tab>
                <Tab eventKey="personal" title="个人库存" tabClassName="nav-link">
                    <PersonalDataTable currentUser={this.props.currentUser}/>;
                </Tab>
                <Tab eventKey="history" title="库存历史" tabClassName="nav-link">
                    <HistoryDataTable currentUser={this.props.currentUser}/>;
                </Tab>
            </Tabs>
        )
    }
}



