import React from 'react';
import InformationDialog from './common/InformationDialog';
import PropTypes from 'prop-types';
import InventoryTable from "./common/InventoryTable";

export default class WithdrawDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            depositTableData: {},
            merchantAndNumberMapping: {},
            confirm: false,
            messageType: "",
            message: "",
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChangeDepositNumber = this.onChangeDepositNumber.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onChangeDealPrice = this.onChangeDealPrice.bind(this);
        this.onChangeRemark = this.onChangeRemark.bind(this);
    }

    static props = {
        depositTableData: PropTypes.object,
    };

    static getDerivedStateFromProps(props, state) {
        let depositTableData={};
        if (props.depositTableData.length === 0 && props.depositTableData.id !== state.depositTableData.id) {
            depositTableData = props.depositTableData;
        }
        return {...props, ...depositTableData};
    }

    onCancel() {
        this.setState({
            show: false,
            confirm: false,
        });
        this.props.onClose();
    }

    isFormValid() {
        return !_.isEmpty(this.state.merchantAndNumberMapping) &&
            _.some(this.props.depositTableData,
                (mcht) => this.state.merchantAndNumberMapping[mcht.id] &&
                    this.state.merchantAndNumberMapping[mcht.id].quantity > 0 &&
                    !_.isEmpty(this.state.merchantAndNumberMapping[mcht.id].info)
            );
    }

    onConfirm() {
        if (!this.isFormValid()) {
            this.props.onConfirm({
                messageType: "danger",
                message: "借调失败，填写的信息有误，请重新输入"});
            return;
        }
        if (!this.state.confirm) {
            this.setState({confirm: true});
            return;
        }

        const withdraw_from = _(this.props.depositTableData).map((mcht) => {
            if (!this.state.merchantAndNumberMapping[mcht.id] || this.state.merchantAndNumberMapping[mcht.id].quantity < 0) {
                return;
            }
            return {
                merchant: mcht.merchantId,
                quantity: this.state.merchantAndNumberMapping[mcht.id].quantity,
                deal_price: this.state.merchantAndNumberMapping[mcht.id].deal_price || mcht.price,
                remarks: this.state.merchantAndNumberMapping[mcht.id].remark,
                info: this.state.merchantAndNumberMapping[mcht.id].info,
            }
        })
            .compact()
            .value();

        const request = {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.props.selectedMerchandiseId,
            quantity: 0,
            withdraw_from : JSON.stringify(withdraw_from),
        };

        $.post('/inventory/withdraw/others/', request).done((data) => {
            this.setState({
                message: data.detail,
                messageType: data.result,
                confirm: false,
                merchantAndNumberMapping: {},
            });
        }).fail((data) => {
            this.setState({
                message: data.responseJSON.detail,
                messageType: data.responseJSON.result,
                confirm: false,
                merchantAndNumberMapping: {},
            });
        }).always(() =>{
            this.props.onConfirm({
                messageType: this.state.messageType === 'fail' ? "danger" : this.state.messageType,
                message: this.state.message
            });
        });
    }

    onChangeDepositNumber(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].quantity = event.target.value;
    }

    onChangeInfo(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].info = event.target.value;
    }

    onChangeDealPrice(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].deal_price = event.target.value;
    }

    onChangeRemark(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].remark = event.target.value;
    }
    getColumns() {
        return ([
            {
                type: "text",
                title: "供货商",
                selector: "merchantName",
                width: 100,
            },
            {
                type: "text",
                title: "电话",
                width: 120,
                selector: "mobile",
            },
            {
                type: "text",
                title: "邮箱",
                width: 200,
                selector: "email",
            },
            {
                type: "text",
                title: "钉钉",
                width: 150,
                selector: "dingding",
            },
            {
                type: "text",
                title: "价格",
                width: 100,
                selector: "price",
            },
            {
                type: "text",
                title: "数量",
                width: 50,
                selector: "quantity",
            },
            {
                type: "action",
                title: "借调数量",
                renderContent: (row) =>
                        (<>
                            <input type="number" placeholder={0} onChange={(event) => this.onChangeDepositNumber(row.original, event)}/>
                        </>)
            },
            {
                type: "action",
                title: "供货信息",
                width: 150,
                selector: "info",
                renderContent: (row) =>
                    (<>
                        <textarea cols={15}
                                  rows={2}
                                  placeholder="请填写供货信息"
                                  onChange={(event) => this.onChangeInfo(row.original, event)}/>
                    </>)
            },
            {
                type: "action",
                title: "成交价格",
                renderContent: (row) => {
                    return (<>
                        <input type="number" placeholder={row.original.price} defaultValue={row.original.price} onChange={(event) => this.onChangeDealPrice(row.original, event)}/>
                    </>);
                }
            },
            {
                type: "action",
                title: "备注",
                renderContent: (row) => {
                    return (<><textarea cols={10} rows={2} placeholder="请填写备注" onChange={(event) => this.onChangeRemark(row.original, event)}/></>);
                }
            },

        ]);
    }

    getConfirmDialogBody() {
        const withdraw_from_info = _(this.props.depositTableData).map((mcht, index) => {
            if (!this.state.merchantAndNumberMapping[mcht.id] || this.state.merchantAndNumberMapping[mcht.id].quantity < 0) {
                return;
            }
            return (<li key={index}>请确认从 {mcht.merchantName} 处借调 {this.state.merchantAndNumberMapping[mcht.id].quantity}件商品</li>)
        })
            .compact()
            .value();

        return (<ul>{withdraw_from_info}
        </ul>)
    }
    getBody() {
        return this.state.confirm ? this.getConfirmDialogBody() : (<InventoryTable
            columns = {this.getColumns()}
            data = {this.props.depositTableData}
            showPagination = {false}
            pageSize={10}
        />);
    }

    render() {
        return <InformationDialog
            className="deposit-dialog"
            show={this.state.show}
            body={this.getBody()}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            title="借调商品"
        />
    }
};
