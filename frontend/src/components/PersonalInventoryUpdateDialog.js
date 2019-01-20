import React from 'react';
import InformationDialog from './InformationDialog'
import PropTypes from 'prop-types';

class PersonalInventoryUpdateDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            options: [],
            selectedBrand: "",
            selectedCategory: "",
            selectedMerchandiseId: 0,
            selectedMerchandiseCode: "",
            price: 0,
            quantity: 0,
            deposit: true,
            confirmed: false
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.getConfirmed = this.getConfirmed.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
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
        (this.state.deposit ? 
        // 新增 
        $.post("/inventory/update/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchandiseId,
            quantity: this.state.quantity,
            price: this.state.price,
            remarks: "",
        })
        // 取出
        :$.post("/inventory/update/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchandiseId,
            quantity: this.state.quantity,
            deposit: this.state.deposit,
            remarks: "",
        })
        )
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
    getConfirmed(){
        this.setState({confirmed: true});
    }
    cancelConfirm(){
        this.setState({confirmed: false});
    }
    getDepositDialogBody() {
        const dialogBody = (this.state.confirmed ? 
            (<div>请确认存入{this.state.selectedBrand}{this.state.selectedCategory}{this.state.selectedMerchandiseCode}的库存, 价格:{this.state.price}, 数量:{this.state.quantity}</div>)
            :(<form className="fieldSection">
                <div className="item"><span>最新价格</span><input placeholder="最新价格"  value={this.state.price} onChange={this.onChangePrice} type="number" min="0"/></div>
                <div className="item"><span>新增数量</span><input placeholder="新增数量"  value={this.state.quantity} onChange={this.onChangeCount} type="number" min="0"/></div>
              </form>));
        return dialogBody;
    }
    getWithdrawDialogBody() {
        const dialogBody = (this.state.confirmed ?
            (<div>请确认取出{this.state.selectedBrand}{this.state.selectedCategory}{this.state.selectedMerchandiseCode}的库存, 数量:{this.state.quantity}</div>)
            :(<form className="fieldSection">
                <div className="item"><span>取出数量</span><input placeholder="取出数量"  value={this.state.quantity} onChange={this.onChangeCount} type="number" min="0"/></div>
              </form>));
        return dialogBody;
    }
    render() {
        const saveDialogBody = this.state.deposit ? this.getDepositDialogBody() : this.getWithdrawDialogBody();
        const title = this.state.deposit ? "新增商品库存" : "取出商品库存";
        return (<InformationDialog show={this.state.show}
                                   onConfirm={this.state.confirmed ? this.saveInventory : this.getConfirmed}
                                   onCancel={this.state.confirmed ? this.cancelConfirm : this.cancelSave}
                                   body={saveDialogBody}
                                   title={this.state.confirmed ? "确认库存信息" : title} />);
    }
}

export default PersonalInventoryUpdateDialog