import React, { useState, useEffect } from "react";
import {
  useParams,
} from "react-router-dom";
import { Col, Row, Card, Table } from "@themesberg/react-bootstrap";
import Axios from "axios";

export default () => {
  let { ref } = useParams();

  const [order, setOrder] = useState(null);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `http://staging-api.famunera.com/partner/v1/orders/${ref}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setOrder(res))
      .catch((err) => setError(err));
  }, []);

  return (
    order && (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
        <Row>
          <Col xs={12} xl={12}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">ORDER: {ref}</h5>
                <Row>
                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Details</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Order Date</th>
                            <th scope="col">
                              {order.data.data.order.order_date}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{`Customer`}</th>
                            <td>
                              {order.data.data.order.order_by || `not set`}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">{`Address`}</th>
                            <td>{`null value`}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Status</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <tbody>
                          <tr>
                            <th scope="col">Payment Method</th>
                            <th scope="col">
                              {order.data.data.order.payment_method}
                            </th>
                          </tr>
                          <tr>
                            <th scope="row">{`Payment Status`}</th>
                            <td>{order.data.data.order.payment_status}</td>
                          </tr>
                          <tr>
                            <th scope="row">{`Order Status`}</th>
                            <td>{order.data.data.order.order_status}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                  <Col xs={12} xl={4}>
                    <Card border="light" className="shadow-sm">
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col>
                            <h5>Summary</h5>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <tbody>
                          <tr>
                            <th scope="col">Total</th>
                            <th scope="col">
                              {order.data.data.order.cart_total}
                            </th>
                          </tr>
                          <tr>
                            <th scope="row">{`Delivery Fee`}</th>
                            <td>{order.data.data.order.shipping_charge}</td>
                          </tr>
                          <tr>
                            <th scope="row">{`Service Fee`}</th>
                            <td>{`0`}</td>
                          </tr>
                          <tr>
                            <th scope="row">{`Grand Total`}</th>
                            <td>
                              {order.data.data.order.cart_total +
                                order.data.data.order.shipping_charge}
                            </td>
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
        <Row>
          <Col xs={12} xl={12}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                  <h5 className="mb-4">ORDER ITEMS</h5>

                  <div>
                    Total Calculated Bonus:{" "}
                    {order.data.data.order.items.reduce(
                      (accumulator, current) =>
                        accumulator + parseInt(current.order_quantity) * parseInt(current.product.ussd_bonus),
                      0
                    )}{" "}
                    UGX
                  </div>
                </div>
                <Row>
                  <Col xs={12} xl={12}>
                    <Card border="light" className="shadow-sm">
                      <Table
                        responsive
                        className="align-items-center table-flush"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Bonus per each</th>
                            <th scope="col">Total bonus on each</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.data.data.order.items.map(
                            ({ order_quantity, product }) => (
                              <tr key={product.ID}>
                                <th scope="row">{product.product_name}</th>                                
                                <td>{product.local_price}</td>
                                <td>{order_quantity}</td>
                                <td>{product.ussd_bonus}</td>
                                <td>{parseInt(order_quantity) * parseInt(product.ussd_bonus)}</td>
                              </tr>
                            )
                          )}
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
    )
  );
};
