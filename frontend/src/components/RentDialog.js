import React from 'react';
import InformationDialog from './InformationDialog';
import PropTypes from 'prop-types';
import InventoryTable from "./InventoryTable";

export default class RentDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: props.showDepositDialog,
            depositTableData: {},
            merchantAndNumberMapping: {},
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChangeDepositNumber = this.onChangeDepositNumber.bind(this);
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
        this.setState({show: false});
        this.props.onClose();
    }

    onConfirm() {
        const withdraw_from = _(this.props.depositTableData).map((mcht) => {
            if (!this.state.merchantAndNumberMapping[mcht.id]) {
                return;
            }
            return {
                mechant: mcht.merchantId,
                quantity: this.state.merchantAndNumberMapping[mcht.id],
            }
        })
            .compact()
            .value();

        const request = {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.props.selectedMerchandiseId,
            deposit: false,
            quantity: 0,
            withdraw_from : withdraw_from,
        };
        console.log(request);
        $.post('/inventory/update/', request, () => {
            this.setState({show: false});
            this.props.onClose();
        })
    }

    onChangeDepositNumber(invt, event) {
        const {merchantAndNumberMapping} = this.state;
        merchantAndNumberMapping[invt.id] = event.target.value;
    }

    getColumns() {
        return ([
            {
                type: "text",
                title: "品牌",
                selector: "brand",
            },
            {
                type: "text",
                title: "品类",
                selector: "category",

            },
            {
                type: "text",
                title: "商品编码",
                selector: "code",
            },
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
            }
        ]);
    }
    getBody() {
        return (<InventoryTable
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