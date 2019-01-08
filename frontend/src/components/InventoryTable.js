import React from 'react';
import _ from 'lodash';

export default class InventoryTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inventories: props.data,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.inventories) {
            return ({ inventories: nextProps.data});
        }
        return ({prevState});
    }

    getBody() {
        return this.state.inventories && _.map(this.state.inventories, (invt, index) => {
            return (<tr key={invt.id}>
                <th>{index+1}</th>
                <th>{invt.brand}</th>
                <th>{invt.category}</th>
                <th>{invt.remarks}</th>
                <th>{invt.quantity}</th>
            </tr>)
        })
    }
    render() {
        return (<table className="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">编号</th>
                <th scope="col">名称</th>
                <th scope="col">品牌</th>
                <th scope="col">品类</th>
                <th scope="col">数量</th>
            </tr>
            </thead>
            <tbody>
                {this.getBody()}
            </tbody>
        </table>);
    }
}
