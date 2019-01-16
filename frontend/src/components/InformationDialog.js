import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';

class InformationDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    };
  }

  static propTypes = {
      show: PropTypes.bool,
      title: PropTypes.string,
      body: PropTypes.element,
      onCancel: PropTypes.func,
      onConfirm: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onCancel} className="information">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.props.body}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onCancel}>取消</Button>
            <Button onClick={this.props.onConfirm}>确认</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InformationDialog
