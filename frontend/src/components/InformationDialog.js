import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class InformationDialog extends React.Component {
  constructor(props) {
    super(props);

    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: props.show
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return ({show: nextProps.show})
    }
    return {show: prevState.show};
  }
  //
  // handleClose() {
  //   this.setState({ show: false });
  // }
  //
  // handleShow() {
  //   this.setState({ show: true });
  // }

  render() {

    return (
      <div>
        {/*<Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>*/}
            {/*{this.props.title}*/}
        {/*</Button>*/}
        <Modal show={this.state.show} onHide={this.props.onCancel}>
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
