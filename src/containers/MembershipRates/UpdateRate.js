import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    no_of_months: "",
    amount: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  return (
    <React.Fragment>
      <Button
        variant="outline-success"
        className="m-1"
        size="sm"
        onClick={() => setShowDefault(true)}
      >
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Edit Rate</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>No. of Months</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder=""
                  value={formValues.no_of_months}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      no_of_months: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder=""
                  value={formValues.amount}
                  onChange={(e) =>
                    onChangeValue({ ...formValues, amount: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="btn btn-outline-primary AddRate"
            onClick={handleClose}
          >
            Update Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
