import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectMerchandise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: null,
          options: [],
            merchandise: {},
        };
        this.buildOptions = this.buildOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getMerchandise();
    }

    static propTypes = {
        onChange: PropTypes.func
    };

    getMerchandise() {
        $.get("inventory/merchandise?page_size=5000", (data) => {
            this.setState({
                merchandise : data.results,
                options: this.buildOptions(data.results)
            });
        });
    }

    buildOptions(merchantdise) {
        return _.map(merchantdise, mdse => {
            return {
                value: mdse.id,
                label: mdse.code
            };
        });
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        const selectedMds =  _.find(this.state.merchandise, opt => opt.id === selectedOption.value);
        this.props.onChange(selectedMds);
    }

    render() {
        const { selectedOption, options } = this.state;

        return (
            <Select
                className="select"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}/>
    );
  }
}

export default SelectMerchandise
