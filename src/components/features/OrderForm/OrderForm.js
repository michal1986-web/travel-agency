import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

import {Row, Col} from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const OrderForm = ({options, tripCost, setOrderOption}) => ( 
  <Row> 
    {pricing.map(option => (
      <Col key={option.id} md={4}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary cost={tripCost} options={options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm; 