import React from 'react';
import InventoryTable from "./common/InventoryTable";
import WithdrawDialog from './dialog/WithdrawDialog';
import { Alert} from 'react-bootstrap';

export default class AllInvtDataTable extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            next: null,
            previous: null,
            originalData: [],
            allInventories: [],
            url : "/inventory/inventories",
            depositTableData: [],
            showWithdrawDialog: false,
            selectedMerchandiseId: 0,
            showWithdrawResultAlert: false,
            pageSize: 20,
            page: 0,
        };
        this.getAllInventories();
        this.onRowClick = this.onRowClick.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onConfirmWithDraw = this.onConfirmWithDraw.bind(this);
        this.onFetchData = this.onFetchData.bind(this);
    }

    getAllInventories() {
        const url = `${this.state.url}?page_size=${this.state.pageSize}&page=${this.state.page+1}`;
        $.get(url, (data) => {
            const inventories = AllInvtDataTable.buildAllInventoryTable(data.results);
            this.setState({
                allInventories: inventories,
                originalData: inventories,
                showWithdrawDialog: false,
                pages: Math.ceil(data.count / this.state.pageSize),
            });
        });
    }

    static buildAllInventoryTable(inventories) {
        return _.chain(inventories)
            .orderBy(invt => invt.merchandise.id)
            .map(invt => {
            return {
                brand: invt.merchandise.brand.brand,
                category: invt.merchandise.category.category,
                id: invt.merchandise.id,
                code: invt.merchandise.code,
                remarks: invt.merchandise.remarks,
                quantity: invt.quantity,
                certification: invt.merchandise.certification,
                spare_parts: invt.merchandise.spare_parts,
                model: invt.merchandise.model,
                after_sales: invt.merchandise.after_sales,
            }})
            .value();
    }

    onRowClick(merchandise) {
        $.get(`inventory/inventories/merchandise?id=${merchandise.id}`, (data) => {
            const depositTableData = this.buildDepositData(data.results);
            this.setState({
                depositTableData: depositTableData,
                showWithdrawDialog: true,
                selectedMerchandiseId: merchandise.id,
            });
        });
    }

    buildDepositData(data) {
        return _(data)
            .filter(mcht => mcht.merchant.id !== this.props.currentUser)
            .map((mcht => {
                return {
                    merchantName: mcht.merchant.name,
                    merchantId: mcht.merchant.id,
                    mobile: mcht.merchant.mobile,
                    email: mcht.merchant.email,
                    dingding: mcht.merchant.dingding,
                    address: mcht.merchant.address,
                    quantity: mcht.quantity,
                    price: mcht.price,
                    id: mcht.id,
                    info: mcht.info,
                }
            }))
            .value();
    }

    getColumns() {
        return [{
            title: "编号",
            selector: "id",
            type: "text",
        },{
            title: "品牌",
            selector: "brand",
            type: "text",
        }, {
            title: "品类",
            selector: "category",
            type: "text",
        }, {
            title: "商品编码",
            selector: "code",
            type: "text",
        }, {
            title: "数量",
            selector: "quantity",
            type: "text"
        }, {
            title: "型号",
            selector: "model",
            type: "text"
        }, {
            title: "认证",
            selector: "certification",
            type: "text"
        }, {
            title: "售后服务",
            type: "action",
            selector: "after_sales",
            renderContent: (row) => `${row.value} 年`,
        }, {
            title: "属性",
            selector: "spare_parts",
            type: "text"
        },{
            title: "操作",
            type: "action",
            renderContent: (row) =>
            {
                return (
                    <button onClick={() => {this.onRowClick(row.original)}}>...</button>
                )
            }
        }
        ]
    }

    onConfirmWithDraw(result) {
        this.setState({
            showWithdrawResultAlert: true,
            ...result
        },
            () => {
            window.setTimeout(()=>{
                this.setState({showWithdrawResultAlert:false})
            },2000)
        }
        );

        this.getAllInventories();
    }

    onCloseDialog() {
        this.setState({showWithdrawDialog: false});
    }


    onFetchData(state) {
        if (this.state.page !== state.page || this.state.pageSize !== state.pageSize) {
            this.setState({
                page: state.page,
                pageSize: state.pageSize
            },  this.getAllInventories);
        }

        const allInventories =  this.applySortAndFilter(state.filtered, state.sorted);
        this.setState({allInventories})
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
        return (<div id="all">
            <InventoryTable className="inventory-table"
                            data={this.state.allInventories}
                            columns={this.getColumns()}
                            showPagination={true}
                            onFetchData={this.onFetchData}
                            pages={this.state.pages}
                            pageSize={this.state.pageSize}
                            manual={true}
            />
            <WithdrawDialog depositTableData= {this.state.depositTableData}
                            show={this.state.showWithdrawDialog}
                            onClose={this.onCloseDialog}
                            onConfirm={this.onConfirmWithDraw}
                            currentUser={this.props.currentUser}
                            selectedMerchandiseId={this.state.selectedMerchandiseId}

            />
            {this.state.showWithdrawResultAlert && <Alert bsStyle={this.state.messageType}>{this.state.message}</Alert>}
        </div>);
    }
}
