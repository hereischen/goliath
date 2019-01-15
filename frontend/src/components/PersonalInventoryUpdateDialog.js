import React from 'react';
import InformationDialog from './InformationDialog'
import Select from 'react-select';
import PropTypes from 'prop-types';
import _ from 'lodash';

class PersonalInventoryUpdateDialog extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            show: props.show,
            options: [],
        };

        this.saveInventory = this.saveInventory.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
    }

    static propTypes = {
      show: PropTypes.bool,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let result;
        if (_.isEmpty(prevState.option)) {
             const option = PersonalInventoryUpdateDialog.getMerchandise();
            return result = {...option}
        }
        console.log(prevState);
        if (nextProps.show !== prevState.show) {
           return result = {...{show: nextProps.show}}
        }
        return result;
    }

    onChangeBrand() {

    }

    saveInventory() {

    }

    cancelSave() {

        this.setState({show: false});
    }

    static getMerchandise() {
        $.get("inventory/merchandise?page_size=5000", (data) => {
            return {options: PersonalInventoryUpdateDialog.buildOptions(data.results)}
        });
    }

    static buildOptions(merchantdise) {
        return _.map(merchantdise, mdse => {
            return {
                value: mdse.id,
                label: mdse.code
            };
        });
    }

    getSaveDialogBody() {
        return (<form>
            <label>品牌</label>
            <Select
                onChange={this.onChangeBrand}
                option={this.state.options}
                // value={this.state.options[0]}
            />
            <label>品类</label><input placeholder="品类"/>
            <label>商品编码</label><input placeholder="商品编码"/>
            <label>数量</label><input placeholder="品牌"/>
            <label>价格</label><input placeholder="品牌"/>
        </form>);

    }

    render() {
        console.log(this.state.show);
        const saveDialogBody = this.getSaveDialogBody();
        return (<InformationDialog show={this.state.show}
                                   onConfirm={this.saveInventory}
                                   onCancel={this.cancelSave}
                                   body={saveDialogBody}
                                   title="新建库存"/>);
    }
}

export default PersonalInventoryUpdateDialog