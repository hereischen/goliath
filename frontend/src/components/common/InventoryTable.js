import React from 'react';
import ReactTable from "react-table";

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

    getRowWidth(width) {
        return width || 100;
    }

    getTitle() {
        return  _.map(this.state.columns, (column) => {
            const width = this.getRowWidth(column.width)
            if (column.type === "text")
           {
               return {
                   Header: column.title,
                   accessor: column.selector,
                   width: width
               }
           }
           if (column.type === "action") {
               return {
                   Header: column.title,
                   accessor: column.selector,
                   Cell: (row) => column.renderContent(row)
               }
           }
        });
    }

    render() {
        return <ReactTable data={this.state.inventories}
                           columns={this.getTitle()}
                           defaultPageSize={10}
                           className="-striped -highlight"
                           filterable={true}
                           showPagination={false}
        />
    }
};
