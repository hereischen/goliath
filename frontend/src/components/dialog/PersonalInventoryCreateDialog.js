import React from 'react';
import InformationDialog from '../common/InformationDialog'
import PropTypes from 'prop-types';
import SelectMerchandise from "../common/SelectMerchandise";

class PersonalInventoryCreateDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            options: [],
            selectedBrand: "",
            selectedCategory: "",
            selectedMerchandiseId: 0,
            selectedMerchandiseCode: "",
            showPriceHelpText: false,
            showQuantityHelpText: false,
            showMerchandiseHelpText: false,
            price: '',
            quantity: '',
            info: '',
            confirmed: false
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.getConfirmed = this.getConfirmed.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
    }

    static propTypes = {
        show: PropTypes.bool,
        closeDialog: PropTypes.func,
        currentUser: PropTypes.string,
        onInventoryCreate: PropTypes.func,
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
            selectedMerchandiseId: selectedMerchandise.id,
            selectedMerchandiseCode: selectedMerchandise.code,
        })
    }

    saveInventory() {
        $.post("/inventory/create/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchandiseId,
            quantity: this.state.quantity,
            price: this.state.price,
            info: this.state.info,
            remarks: "",
        })
            .done((data) => {
                this.resetFields({message: data.detail, messageType: data.result});
            })
            .fail((data) => {
                this.resetFields({message: data.responseJSON.detail, messageType: data.responseJSON.result})
            })
            .always(() => {
                this.props.onInventoryCreate({
                    message: this.state.message,
                    messageType: this.state.messageType !== 'success' ?
                        "danger" : this.state.messageType,});
            });
    }

    resetFields(result) {
        this.setState({
            show: false,
            confirmed: false,
            selectedBrand: "",
            selectedCategory: "",
            selectedMerchandiseId: 0,
            selectedMerchandiseCode: "",
            showPriceHelpText: false,
            showQuantityHelpText: false,
            showMerchandiseHelpText: false,
            price: '',
            quantity: '',
            ...result
        });
    }

    cancelSave() {
        this.resetFields();
        this.props.closeDialog();
    }

    onChangePrice(event) {
        this.setState( {price: event.target.value})
    }
    onChangeCount(event) {
        this.setState({quantity: event.target.value});
    }

    onChangeInfo(event) {
        this.setState({ info: event.target.value})
    }

    isValidQuantity() {
        return this.state.quantity > 0;
    }

    isValidPrice() {
        return this.state.price > 0;
    }

    isValidInfo() {
        return !_.isEmpty(this.state.info);
    }

    isValidSelectMerchandise() {
        return !_.isEmpty(this.state.selectedMerchandiseCode);
    }

    FormValid() {
        const showMerchandiseHelpText = !this.isValidSelectMerchandise();
        const showQuantityHelpText = !this.isValidQuantity();
        const showPriceHelpText = !this.isValidPrice();
        const showInfoHelpText = !this.isValidInfo();

        this.setState({
            showMerchandiseHelpText: showMerchandiseHelpText,
            showQuantityHelpText: showQuantityHelpText,
            showPriceHelpText: showPriceHelpText,
            showInfoHelpText,
        });

        return !showQuantityHelpText && !showPriceHelpText && !showMerchandiseHelpText && !showInfoHelpText;
    }
    getConfirmed(){
        if (this.FormValid()) {
            this.setState({confirmed: true});
        }
    }
    cancelConfirm(){
        this.resetFields();
    }
    getSaveDialogBody() {
        const helpText = "此项为必填项";
        return (this.state.confirmed ?
            (<div>请确认创建{this.state.selectedBrand}{this.state.selectedCategory}{this.state.selectedMerchandiseCode}的库存,
                价格:{this.state.price}, 数量:{this.state.quantity}</div>)
            : (<form className="fieldSection">
                <div className="item">
                    <label className="title">编码:</label>
                    <SelectMerchandise onChange={this.onChange}/>
                    {this.state.showMerchandiseHelpText && <span style={{color: "red"}}>{helpText}</span>}
                </div>
                <div className="item">
                    <label  className="title">品牌:</label>
                    <input
                    placeholder="品牌"
                    value={this.state.selectedBrand}
                    disabled/></div>
                <div className="item">
                    <label className="title">品类:</label>
                    <input placeholder="品类" value={this.state.selectedCategory}  disabled/>
                </div>
                <div className="item">
                    <label className="title">价格:</label>
                    <input placeholder="新建库存价格" name="price" onChange={this.onChangePrice} type="number" min="0"/>
                    {this.state.showPriceHelpText && <span style={{color: "red"}}>{helpText}</span>}
                </div>
                <div className="item">
                    <label className="title">数量:</label>
                    <input placeholder="新建库存数量" onChange={this.onChangeCount} type="number" min="0"/>
                    {this.state.showQuantityHelpText && <span style={{color: "red"}}>{helpText}</span>}
                </div>
                <div className="item">
                    <label className="title">供货信息:</label>
                    <textarea placeholder="供货信息" onChange={this.onChangeInfo} cols={20} rows={2}/>
                    {this.state.showInfoHelpText && <span style={{color: "red"}}>{helpText}</span>}
                </div>
            </form>));
    }

    render() {
        const saveDialogBody = this.getSaveDialogBody();
        return (<InformationDialog show={this.state.show}
                                   onConfirm={this.state.confirmed ? this.saveInventory : this.getConfirmed}
                                   onCancel={this.state.confirmed ? this.cancelConfirm : this.cancelSave}
                                   body={saveDialogBody}
                                   title={this.state.confirmed ? "确认库存信息" : "新建商品库存"}/>);
    }
}

export default PersonalInventoryCreateDialog
