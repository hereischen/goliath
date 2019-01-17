import React from 'react';
import InformationDialog from './InformationDialog'
import _ from 'lodash';
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
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
    }

    static propTypes = {
        show: PropTypes.bool,
        onCancel: PropTypes.func,
        currentUser: PropTypes.string
    };

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {show: props.show};
        }
        return state;
    }

    onChange(selectedMerchandise) {
        this.setState({
            selectedBrand:selectedMerchandise.brand.brand,
            selectedCategory:selectedMerchandise.category.category,
            selectedMerchantId: selectedMerchandise.id,
        })
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
        this.props.cancelSave();
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
                <SelectMerchandise onChange={this.onChange}/>
            </div>
            <div className="item"><span>品牌</span><input placeholder="品牌" value={this.state.selectedBrand} disabled/></div>
            <div className="item">品类<input placeholder="品类"  value={this.state.selectedCategory} disabled/></div>
            <div className="item">价格<input placeholder="品牌"  value={this.state.price} onChange={this.onChangePrice} type="number" min="0"/></div>
            <div className="item">数量<input placeholder="品牌"  value={this.state.quantity} onChange={this.onChangeCount} type="number" min="0"/></div>
        </form>);
    }

    render() {
        const saveDialogBody = this.getSaveDialogBody();
        return (<InformationDialog show={this.state.show}
                                   onConfirm={this.saveInventory}
                                   onCancel={this.cancelSave}
                                   body={saveDialogBody}
                                   title="新建库存"/>);
    }
}

export default PersonalInventoryUpdateDialog