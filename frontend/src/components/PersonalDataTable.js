import React from 'react';
import InventoryTable from "./common/InventoryTable";
import {Alert} from 'react-bootstrap';
import utils from "../utils/utils";
import PersonalInventoryCreateDialog from './dialog/PersonalInventoryCreateDialog';
import PersonalInventoryUpdateDialog from './dialog/PersonalInventoryUpdateDialog';

export default class PersonalDataTable extends React.Component{
    static buildPersonalInventoryTable(inventories) {
        return _.chain(inventories)
            .orderBy(invt => invt.merchandise.id)
            .map(invt => {
                return {
                    brand: invt.merchandise.brand.brand,
                    category: invt.merchandise.category.category,
                    id: invt.merchandise.id,
                    info: invt.info,
                    code: invt.merchandise.code,
                    remarks: invt.merchandise.remarks,
                    quantity: invt.quantity,
                    price: invt.price,
                    certification: invt.merchandise.certification,
                    spare_parts: invt.merchandise.spare_parts,
                    model: invt.merchandise.model,
                    modifiedDate: utils.formatDate(invt.modified_date, "YYYY-MM-DD hh:mm"),
                }})
            .value();
    }

    constructor (props) {
        super(props);
        this.state = {
            next: null,
            previous: null,
            personalInventories: [],
            originalData: [],
            showCreateInvtDialog: false,
            showUpdateInvtDialog: false,
            showUpdateInvtResult: false,
            message: "",
            messageType: "",
            url: `/inventory/inventories/merchants?id=${this.props.currentUser}`,
            pageSize: 20,
            page: 0,
        };
        this.CURRENT_KEY = 'personal';
        this.showCreateDialog = this.showCreateDialog.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onSaveInventry = this.onSaveInventry.bind(this);
        this.onInventoryCreate = this.onInventoryCreate.bind(this);
        this.onFetchData = this.onFetchData.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentKey !== this.CURRENT_KEY && this.props.currentKey === this.CURRENT_KEY) {
            this.getPersonalInventories();
        }
    }

    getPersonalInventories() {
        const url = `${this.state.url}&page_size=${this.state.pageSize}&page=${this.state.page+1}`;
        $.get(url, (data) => {
            const inventories = PersonalDataTable.buildPersonalInventoryTable(data.results);
            this.setState({
                personalInventories: inventories,
                originalData: inventories,
                options: [],
                pages: Math.ceil(data.count / this.state.pageSize),
            });
        });
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
                title: "编号",
                selector: "id",
            },
            {
                type: "text",
                title: "品牌",
                selector: "brand",
            }, {
                type: "text",
                title: "品类",
                selector: "category",
                width: 200,
            }, {
                type: "text",
                title: "商品编码",
                selector: "code",
            }, {
                type: "text",
                title: "数量",
                selector: "quantity",
                width: 50,
            }, {
                type: "text",
                title: "价格",
                selector: "price",
            }, {
                title: "型号",
                selector: "model",
                type: "text"
            }, {
                title: "认证",
                selector: "certification",
                type: "text"
            },{
                title: "供货信息",
                selector: "info",
                width: 150,
                type: "action",
                renderContent: row => {
                    return <span title={row.value}>{row.value}</span>
                }
            }, {
                title: "属性",
                selector: "spare_parts",
                type: "action",
                renderContent: row => {
                    return <span title={row.value}>{row.value}</span>
                }
            }, {
                type: "text",
                title: "修改时间",
                selector: "modifiedDate",
                width: 100,
            }, {
                type: "action",
                title: "操作",
                renderContent: (row) =>
                    (<>
                        <button onClick={() => {this.onRowClick(row.original.id, true)}} className="row-action">+</button>
                        <button onClick={() => {this.onRowClick(row.original.id, false)}} className="row-action">-</button></>)
            }

        ];
        }

    onInventoryCreate(result) {
        this.setState({
            showCreateInvtDialog: false,
            showUpdateInvtResult: true,
            ...result,
        },
            () => {
            window.setTimeout(()=>{
                this.setState({showUpdateInvtResult:false})
            },4000)
        }
        );

        this.getPersonalInventories();
    }

    onSaveInventry(result) {
        this.setState({
            showUpdateInvtDialog: false,
            showUpdateInvtResult: true,
            ...result,
        }, () => {
            window.setTimeout(()=>{
                this.setState({showUpdateInvtResult:false})
            },4000)
        });

        this.getPersonalInventories();
    }

    onFetchData(state) {
        if (this.state.page !== state.page || this.state.pageSize !== state.pageSize) {
            this.setState({
                page: state.page,
                pageSize: state.pageSize
            },  this.getPersonalInventories);
        }

        const personalInventories = this.applySortAndFilter(state.filtered, state.sorted)
        this.setState({personalInventories})
    }

    applySortAndFilter(filtered, sorted) {
        let filteredData = this.state.originalData;
        if (!_.isEmpty(filtered)) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                    return (row[nextFilter.id] + "").includes(nextFilter.value);
                });
            }, filteredData);
        }
        return _.orderBy(
            filteredData,
            sorted.map(
                sort => {
                    return row => {
                        if (row[sort.id] === null || row[sort.id] === undefined) {
                            return -Infinity;
                        }
                        return typeof row[sort.id] === "string"
                            ? row[sort.id].toLowerCase()
                            : row[sort.id];
                    };
                }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
        );
    }

    render() {
        return (<div id="personal">
            <button className="btn btn-default create-inventory" onClick={this.showCreateDialog}>新建库存</button>
            <InventoryTable className="inventory-table"
                            data={this.state.personalInventories}
                            columns={this.getColumns()}
                            pages={this.state.pages}
                            pageSize={this.state.pageSize}
                            showPagination={true}
                            onFetchData={this.onFetchData}
                            manual={true}
            />
            {this.state.showUpdateInvtResult && <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>}

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
