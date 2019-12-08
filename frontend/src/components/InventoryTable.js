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

    getClassName(className) {
        const ellipsisClass = "ellipsis";
        const customClass = className || "";

        return `${ellipsisClass} ${customClass}`.trim();
    }

    getRowWidth(width) {
        return width || 100;
    }
    // getBody() {
    //     return !_.isEmpty(this.state.inventories) && _.map(this.state.inventories, (invt, index) => {
    //         return (<tr key={invt.id}>
    //             <td>{index + 1}</td>
    //             {
    //                 _.map(this.state.columns, (column, ind) => {
    //                     if (column.type === "action") {
    //                         return (column.renderContent(invt, ind));
    //                     }
    //                     return (<td className={this.getClassName(column.className)}
    //                                 key={ind}
    //                                 style={{maxWidth: `${this.getRowWidth(column.width)}px`, }}
    //                                 title={invt[column.selector]}>
    //                         {invt[column.selector]}
    //                     </td>);
    //                 })
    //             }
    //         </tr>)
    //     });
    // }


    renderTitle() {
        const columns = [(<th key="0">编号</th>)];
        return _.concat(columns, _.map(this.state.columns, (column, index) => {
            return (<th scope="col" key={index+1}>{column.title}</th>);
        }));
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
