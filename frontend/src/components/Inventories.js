import React from "react";
import {Tabs, Tab} from "react-bootstrap";
import AllInvtDataTable from "./AllInvtDataTable";
import PersonalDataTable from "./PersonalDataTable";
import HistoryDataTable from "./HistoryDataTable";

export default class Inventories extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey="all" id="inventory">
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



