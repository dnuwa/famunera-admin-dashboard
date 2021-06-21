import React, { useEffect, useState } from "react";
import {
  faBoxes,
  faUser,
  faShoppingCart,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/Widgets";
import Axios from "axios";

export default () => {
  const [orders, setOrders] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `http://staging-api.famunera.com/partner/v1/orders/partnerOrders/${localStorage.getItem(
        "partnerId"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setOrders(res.data.data.orders))
      .catch((err) => setError(err));
  }, []);

  const [admins, setState] = useState([]);

  useEffect(() => {
    Axios.get(`http://staging-api.famunera.com/private/v1/admin`).then(
      (res) => {
        const persons = res.data.data.adminUsers;
        setState({ persons });
      }
    );
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h4>Dashboard</h4>
      </div>

      <Row className="">
      <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Bonuses"
            title={`${orders.reduce(
              (accumulator, current) =>
                accumulator + parseInt(current.bonus_total || 0),
              0
            )} UGX`}
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faMoneyBill}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Admins"
            title={
              admins.length !== 0 &&
              admins.persons.filter(
                (itemInArray) =>
                  itemInArray.partnerId ===
                  parseInt(localStorage.getItem("partnerId"))
              ).length
            }
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faUser}
            iconColor="shape-secondary"
          />
        </Col>

        {localStorage.getItem("partnerId") === 1 && (
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category="Products"
              title="1302"
              // period="Feb 1 - Apr 1"
              // percentage={28.4}
              icon={faBoxes}
              iconColor="shape-tertiary"
            />
          </Col>
        )}

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Orders"
            title={orders.length}
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faShoppingCart}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>
    </>
  );
};
