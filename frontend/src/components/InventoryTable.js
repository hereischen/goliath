import React from 'react';
import _ from 'lodash';

export default class InventoryTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inventories: props.data,
            columns: props.columns
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.inventories) {
            return ({ inventories: nextProps.data});
        }
        return ({prevState});
    }

    getBody() {
        return !_.isEmpty(this.state.inventories) && _.map(this.state.inventories, (invt, index) => {
            return (<tr key={invt.id}>
                <td>{index + 1}</td>
                {
                    _.map(this.state.columns, (column, ind) => {
                        return (<td key={ind}>{invt[column.selector]}</td>)
                    })
                }
            </tr>)
        });
    }


    renderTitle() {
        const columns = [(<th key="0">编号</th>)];
        return _.concat(columns, _.map(this.state.columns, (column,index) => {
                return (<th scope="col" key={index+1}>{column.text}</th>);
        }));
    }

    render() {
        const emptyContent = (<p className="empty-form">没有相关数据</p>);
        return (<div><table className="table table-striped table-dark">
            <thead>
            <tr>
                {this.renderTitle()}
            </tr>
            </thead>
            <tbody>
                {this.getBody()}
            </tbody>
        </table>
            {_.isEmpty(this.state.inventories) && emptyContent}
        </div>);
    }
}
