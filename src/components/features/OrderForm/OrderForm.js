import React from 'react';
import styles from './OrderForm.scss';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import settings from '../../../data/settings';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripId, tripName, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
  alert('Your order has been successfully');
};

const OrderForm = ({options, tripCost, setOrderOption, tripName, tripId, countryCode}) => {
  const isEnabled = options.name.length >= 1 && options.contact.length >= 1;
  return (
    <Row className={styles.component}> 
      {pricing.map(option => (
        <Col key={option.id} md={4}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary cost={tripCost} options={options}/>
        <Button disabled={!isEnabled} onClick={() => sendOrder(options, tripCost, tripId, tripName, countryCode)}>Order</Button>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  countryCode: PropTypes.any,
};

export default OrderForm; 