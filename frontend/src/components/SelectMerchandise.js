import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

class SelectMerchandise extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedOption: null,
          options: []
        };
        this.buildOptions = this.buildOptions.bind(this);
        this.getMerchandise();
    }

    getMerchandise() {
        $.get("inventory/merchandise?page_size=5000", (data) => {
            this.setState({
                options: this.buildOptions(data.results)
            });
        });
    }

    buildOptions(merchantdise) {
        return _.map(merchantdise, mdse => {
            return {
                value: mdse.id,
                label: mdse.code
            }
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const { selectedOption, options } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
    );
  }
}

export default SelectMerchandise
