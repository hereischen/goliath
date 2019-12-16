import React from 'react';
import InformationDialog from '../common/InformationDialog'
import PropTypes from 'prop-types';

class PersonalInventoryUpdateDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            selectedBrand: "",
            selectedCategory: "",
            selectedMerchandiseId: 0,
            selectedMerchandiseCode: "",
            price: 0,
            quantity: 0,
            deposit: true,
            confirmed: false,
            showCountHelpText: false,
            showPriceHelpText: false,
            message: "",
            messageType: "",
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.getConfirmed = this.getConfirmed.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
    }

    static propTypes = {
        deposit: PropTypes.bool,
        show: PropTypes.bool,
        closeDialog: PropTypes.func,
        onSaveInventry: PropTypes.func,
        currentUser: PropTypes.string,
        selectedMerchandise: PropTypes.object,
    };

    static getDerivedStateFromProps(props, state) {
        let selectedMerchandise = {};
        let result = {};
        if (props.selectedMerchandise && props.selectedMerchandise.id !== state.selectedMerchandiseId) {
            selectedMerchandise = props.selectedMerchandise;
        }
        if (!_.isEmpty(selectedMerchandise)) {
            result =  {
                selectedMerchandiseId: selectedMerchandise.id,
                price: selectedMerchandise.price,
                info: selectedMerchandise.info,
            };
        }
        return {...props, ...result};
    }

    saveInventory() {
        this.state.deposit ?
            this.depositInventory()
            : this.withdrawInventory();
    }

    depositInventory() {
        $.post("/inventory/deposit/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchandiseId,
            quantity: this.state.quantity,
            remarks: "",
            info: this.state.info,
            price: this.state.price
        }).done((data) => {
            this.setState({
                message: data.detail,
                messageType: data.result,
                show: false,
                selectedBrand: "",
                selectedCategory: "",
                selectedMerchandiseId: 0,
                selectedMerchandiseCode: "",
                price: 0,
                quantity: 0,
                deposit: true,
                confirmed: false,
            });
        }).fail((data) => {
            this.setState({
                message: data.detail,
                messageType: data.result,
            });
        }).always(() => {
            this.props.onSaveInventry({
                messageType: this.state.messageType === 'fail' ? "danger" : this.state.messageType,
                message: this.state.message
            });
        });
    }

    withdrawInventory(){
        $.post("/inventory/withdraw/", {
            current_merchant_id: this.props.currentUser,
            merchandise_id: this.state.selectedMerchandiseId,
            quantity: this.state.quantity,
            remarks: "",
            info: this.state.info,
            price: this.state.price
        }).done((data) => {
            this.setState({
                message: data.detail,
                messageType: data.result,
                show: false,
                selectedBrand: "",
                selectedCategory: "",
                selectedMerchandiseId: 0,
                selectedMerchandiseCode: "",
                price: 0,
                quantity: 0,
                deposit: true,
                confirmed: false,
            });
        }).fail((data) => {
            this.setState({
                message: data.detail,
                messageType: data.result,
            });
            }).always(() => {
            this.props.onSaveInventry({
                messageType: this.state.messageType === 'fail' ? "danger" : this.state.messageType,
                message: this.state.message
            });
        });
    }

    cancelSave() {
        this.resetFields();
        this.props.closeDialog();
    }

    onChangePrice(event) {
        this.setState( {price: event.target.value, showPriceHelpText: false})
    }

    onChangeCount(event) {
        this.setState({quantity: event.target.value, showCountHelpText: false});
    }

    onChangeInfo(event) {
        this.setState({info: event.target.value});
    }

    getConfirmed(){
        const showCountHelpText = (!this.state.deposit && this.state.quantity > this.props.selectedMerchandise.quantity)
            || this.state.quantity <= 0;

        const showPriceHelpText = this.state.deposit && this.state.price <= 0;

        if (showPriceHelpText || showCountHelpText) {
            this.setState({showPriceHelpText, showCountHelpText});
        }
        else {
            this.setState({
                confirmed: true,
            });
        }
    }

    resetFields() {
        this.setState({
            show: false,
            confirmed: false,
            showPriceHelpText: false,
            showCountHelpText: false,
            quantity: 0,
        });
    }

    cancelConfirm(){
        this.resetFields();
    }

    getDialogBody() {
        if (!this.state.show) return null;
        return this.state.deposit ? this.getDepositDialogBody() : this.getWithdrawDialogBody();
    }

    getDepositDialogBody() {
        const dialogBody = (this.state.confirmed ?
            (<div>请确认存入{this.props.selectedMerchandise.brand}{this.props.selectedMerchandise.category}{this.props.selectedMerchandise.code}的库存,
                价格:{this.state.price},
                数量:{this.state.quantity}</div>)
            :(<form className="fieldSection">
                <div className="item"><label className="title">品牌:</label><span>{this.props.selectedMerchandise.brand}</span></div>
                <div className="item"><label className="title">品类:</label><span>{this.props.selectedMerchandise.category}</span></div>
                <div className="item"><label className="title">商品编码:</label><span>{this.props.selectedMerchandise.category}</span></div>
                <div className="item"><label className="title">最新价格:</label>
                    <input value={this.state.price}
                           onChange={this.onChangePrice}
                           type="number"
                           min="0"
                    />
                   {this.state.showPriceHelpText && <span style={{color: "red"}}>价格必须大于0</span>}

                </div>
                <div className="item"><label className="title">新增数量:</label>
                    <input value={this.state.quantity}
                           onChange={this.onChangeCount}
                           type="number" min="0"/>
                    {this.state.showCountHelpText && <span style={{color: "red"}}>增加数量必须大于0</span>}
                </div>
                <div className="item"><label className="title">供货信息:</label>
                    <textarea value={this.state.info}
                              onChange={this.onChangeInfo}
                              cols={20} rows={2}
                    />
                </div>
              </form>));
        return dialogBody;
    }
    getWithdrawDialogBody() {
        const dialogBody = (this.state.confirmed ?
            (<div>请确认取出{this.state.selectedBrand}{this.state.selectedCategory}{this.state.selectedMerchandiseCode}的库存,
                数量:{this.state.quantity}</div>)
            :(<form className="fieldSection">
                <div className="item"><label className="title">品牌:</label><span>{this.props.selectedMerchandise.brand}</span></div>
                <div className="item"><label className="title">品类:</label><span>{this.props.selectedMerchandise.category}</span></div>
                <div className="item"><label className="title">商品编码:</label><span>{this.props.selectedMerchandise.category}</span></div>
                <div className="item"><label className="title">最新价格:</label><span> {this.state.price}</span></div>
                <div className="item"><label className="title" >取出数量</label>
                    <input placeholder="取出数量"
                           value={this.state.quantity}
                           onChange={this.onChangeCount}
                           type="number" min="0"/>
                    {this.state.showCountHelpText && <span style={{color: "red"}}>取出数量需要小于用户拥有的数量</span>}
                </div>
                <div className="item"><label className="title">供货信息:</label>
                    <textarea value={this.state.info}
                              onChange={this.onChangeInfo}
                              cols={20} rows={2}
                              cols={20} rows={2}
                    />
                </div>
              </form>));
        return dialogBody;
    }
    render() {
        const saveDialogBody = this.getDialogBody();
        const title = this.state.deposit ? "新增商品库存" : "取出商品库存";
        return this.state.show ? (<InformationDialog show={this.state.show}
                                   onConfirm={this.state.confirmed ? this.saveInventory : this.getConfirmed}
                                   onCancel={this.state.confirmed ? this.cancelConfirm : this.cancelSave}
                                   body={saveDialogBody}
                                   title={this.state.confirmed ? "确认库存信息" : title} />) : null;
    }

}

export default PersonalInventoryUpdateDialog