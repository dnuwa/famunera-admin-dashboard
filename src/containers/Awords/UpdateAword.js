import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default ({ setReload, id }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    link: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  useEffect(() => {
    setLoadingStatus(true);
    if (id) {
      Axios({
        method: "GET",
        url: `http://staging-api.famunera.com/partner/v1/awards/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          onChangeValue({
            ...formValues,
            link: res.data.data.award.link,
          });
          setLoadingStatus(false);
        })
        .catch((err) => setIsError(err));
    }
  }, [id]);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "PUT",
      url: `http://staging-api.famunera.com/partner/v1/awards/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        link: formValues.link,
        // thumbnail: "Test Award Thunbnail",
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
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Edit Award</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {loadingStatus ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formValues.link}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      link: d.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  // value={formValues.ad_file}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      featured_image: d.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          )}

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
