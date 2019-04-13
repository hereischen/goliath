import React from 'react';
import InformationDialog from './InformationDialog';
import PropTypes from 'prop-types';
import InventoryTable from "./InventoryTable";

export default class WithdrawDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            depositTableData: {},
            merchantAndNumberMapping: {},
            confirm: false,
            errorMessage: "",
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChangeDepositNumber = this.onChangeDepositNumber.bind(this);
        this.onChangeDealPrice = this.onChangeDealPrice.bind(this);
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

    onConfirm() {
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
                deal_price: this.state.merchantAndNumberMapping[mcht.id].deal_price,
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

        $.post('/inventory/withdraw/others/', request, (data) => {
            this.setState({message: data.details});
        });
    }

    onChangeDepositNumber(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].quantity = event.target.value;
    }

    onChangeDealPrice(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = merchantAndNumberMapping[invt.id]|| {};
        merchantAndNumberMapping[invt.id].deal_price = event.target.value;
    }
    getColumns() {
        return ([
            {
                type: "text",
                title: "供货商-姓名",
                selector: "merchantName"
            },
            {
                type: "text",
                title: "供货商-电话",
                selector: "mobile",
            },
            {
                type: "text",
                title: "供货商-邮箱",
                selector: "email",
            },
            {
                type: "text",
                title: "供货商-叮叮",
                selector: "dingding",
            },
            {
                type: "text",
                title: "价格",
                selector: "price",
            },
            {
                type: "text",
                title: "数量",
                selector: "quantity",
            },
            {
                type: "action",
                title: "借出数量",
                renderContent: (invt, ind) =>
                        (<td key={ind}>
                            <input type="number" placeholder={0} onChange={(event) => this.onChangeDepositNumber(invt, event)}/>
                        </td>)
            },
            {
                type: "action",
                title: "成交价格",
                renderContent: (invt, ind) => {
                    return (<td key={ind}><input type="number" placeholder={invt.price} value={invt.price} onChange={(event) => this.onChangeDealPrice(invt, event)}/></td>);
                }
            }
        ]);
    }

    getConfirmDialogBody() {
        const withdraw_from_info = _(this.props.depositTableData).map((mcht, index) => {
            if (!this.state.merchantAndNumberMapping[mcht.id] || this.state.merchantAndNumberMapping[mcht.id].quantity < 0) {
                return;
            }
            return (<li key={index}>请确认从 {mcht.merchantName} 处购买 {this.state.merchantAndNumberMapping[mcht.id].quantity}件商品</li>)
        })
            .compact()
            .value();

        return (<ul>{withdraw_from_info}
        <p className="error">{this.state.errorMessage}</p>
        </ul>)
    }
    getBody() {
        return this.state.confirm ? this.getConfirmDialogBody() : (<InventoryTable
            columns = {this.getColumns()}
            data = {this.props.depositTableData}
        />);
    }

    render() {
        return <InformationDialog
            className="deposit-dialog"
            show={this.state.show}
            body={this.getBody()}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            title="租借设备"
        />
    }
};
