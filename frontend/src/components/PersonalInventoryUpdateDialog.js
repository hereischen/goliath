import React from 'react';
import InformationDialog from './InformationDialog'
import PropTypes from 'prop-types';
import SelectMerchandise from "./SelectMerchandise";

class PersonalInventoryUpdateDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            options: [],
            selectedBrand: "",
            selectedCategory: "",
            selectedMerchantId: 0,
            price: 0,
            quantity: 0,
            deposit: true,
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
    }

    static propTypes = {
        deposit: PropTypes.bool,
        show: PropTypes.bool,
        onCancel: PropTypes.func,
        currentUser: PropTypes.string,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {show: props.show};
        }
        return state;
    }

    saveInventory() {
        console.log(this.state);
        $.post("/inventory/update/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchantId,
            quantity: this.state.quantity,
            price: this.state.price,
            remarks: "",
        })
    }

    cancelSave() {
        this.setState({show: false});
        this.props.closeDialog();
    }

    onChangePrice(event) {
        this.setState( {price: event.target.value})
    }

    onChangeCount(event) {
        this.setState({quantity: event.target.value});
    }

    getSaveDialogBody() {
        return (<form className="fieldSection">
            <div className="item">
                <span>商品编码</span>
                <div>{this.state.selectedMerchant}</div>
            </div>
            <div className="item"><span>品牌</span><div>{this.state.selectedBrand}</div></div>
            <div className="item"><span>品类</span><div>{this.state.selectedCategory}</div></div>
            <div className="item"><span>价格</span><input value={this.state.price} disabled={this.props.deposit} onChange={this.onChangePrice}/></div>
            <div className="item">{`数量 ${this.props.deposit ? "增加":"减少"}`}<input placeholder="数量"  value={this.state.quantity} onChange={this.onChangeCount} type="number" min="0"/></div>
        </form>);
    }

    render() {
        const saveDialogBody = this.getSaveDialogBody();
        return (<InformationDialog show={this.state.show}
                                   onConfirm={this.saveInventory}
                                   onCancel={this.cancelSave}
                                   body={saveDialogBody}
                                   title={this.props.deposit ? "添加库存" : "减少库存"}/>);
    }
}

export default PersonalInventoryUpdateDialog