import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Card, Table, Spinner } from "@themesberg/react-bootstrap";
import Axios from "axios";

export default () => {
  let { userId } = useParams();

  const [user, setUser] = useState(null);
  const [isError, setError] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `http://staging-api.famunera.com/private/v1/admin/users/${userId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setUser(res.data.data.User);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, []);

  return !loadingStatus && user ? (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row>
        <Col xs={12} xl={12}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">User</h5>
              <Row>
                <Col xs={12} xl={4}>
                  <Card border="light" className="shadow-sm">
                    {/* <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Details</h5>
                          </Col>
                        </Row>
                      </Card.Header> */}
                    <Table
                      responsive
                      className="align-items-center table-flush"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Order Date</th>
                          <th scope="col">{user.email}</th>
                        </tr>
                        <tr>
                          <th scope="row">{`Customer`}</th>
                          <th scope="col">{user.email}</th>
                        </tr>
                        <tr>
                          <th scope="row">{`Address`}</th>
                          <th scope="col">{user.email}</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                          <tr>
                            <th scope="row">{`Customer`}</th>
                            <td>
                              { `not set`}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">{`Address`}</th>
                            <td>{`null value`}</td>
                          </tr>
                        </tbody> */}
                    </Table>
                  </Card>
                </Col>
                <Col xs={12} xl={8}>
                  <Card border="light" className="shadow-sm">
                    {/* <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Status</h5>
                          </Col>
                        </Row>
                      </Card.Header> */}
                    <Table
                      responsive
                      className="align-items-center table-flush"
                    >
                      <tbody>
                        <tr>
                          <th scope="col">Profile</th>
                          <th scope="col">
                            {/* {order.data.data.order.payment_method} */}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Spinner animation="border" />
  );
};
