import React from 'react';
import Select from 'react-select';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class CreateInvtDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            创建新库存
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>请输入新库存详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>取消</Button>
            <Button onClick={this.handleClose}>确认</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CreateInvtDialog
