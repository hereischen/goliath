import React from 'react';

export default class InventoryTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inventories: props.data,
            columns: props.columns,
            className: props.className,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.inventories) {
            return ({ inventories: nextProps.data});
        }
        return ({prevState});
    }

    getClassName(className, needEllipsis) {
        const ellipsisClass = needEllipsis ? "ellipsis" : "";
        const customClass = className || "";

        return `${ellipsisClass} ${customClass}`.trim();
    }

    getBody() {
        return !_.isEmpty(this.state.inventories) && _.map(this.state.inventories, (invt, index) => {
            return (<tr key={invt.id}>
                <td>{index + 1}</td>
                {
                    _.map(this.state.columns, (column, ind) => {
                        if (column.type === "action") {
                            return (column.renderContent(invt, ind));
                        }
                        return (<td className={this.getClassName(column.className, column.ellipsis)} key={ind} title={invt[column.selector]}>{invt[column.selector]}</td>);
                    })
                }
            </tr>)
        });
    }


    renderTitle() {
        const columns = [(<th key="0">编号</th>)];
        return _.concat(columns, _.map(this.state.columns, (column, index) => {
            return (<th scope="col" key={index+1}>{column.title}</th>);
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
