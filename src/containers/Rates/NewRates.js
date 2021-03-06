import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    title: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "POST",
      url: "http://staging-api.famunera.com/partner/v1/blogChannels",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        title: formValues.title,
        slug: " blog channel slug",
        description: "This is a description of the blog channel",
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
        setReload(true);
        handleClose();
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outline-secondary" onClick={() => setShowDefault(true)}>
        Add Rate
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Rate</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>No. of Months</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              value={formValues.name}
              onChange={(d) =>
                onChangeValue({ ...formValues, name: d.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Amount in UGX</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              value={formValues.name}
              onChange={(d) =>
                onChangeValue({ ...formValues, name: d.target.value })
              }
            />
          </Form.Group>

          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? `Save` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
