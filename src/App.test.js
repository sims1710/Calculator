{/* Check if all arithmetic operations are working properly */}
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Calculator App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('handles number clicks correctly', () => {
    const wrapper = shallow(<App />);
    
    // Simulate clicking the number '5'
    wrapper.find('.calculator-row.third .square').at(1).simulate('click');

    // Ensure the displayValue and currentValue are updated correctly
    expect(wrapper.state('displayValue')).toEqual('5');
    expect(wrapper.state('currentValue')).toEqual('5');
  });

  // Add more test cases for other functionalities

  it('handles equal click correctly', () => {
    const wrapper = shallow(<App />);
    
    // Simulate clicking the number '5'
    wrapper.find('.calculator-row.third .square').at(1).simulate('click');
    // Simulate clicking the addition operator
    wrapper.find('.calculator-row.fourth .square').at(3).simulate('click');
    // Simulate clicking the number '3'
    wrapper.find('.calculator-row.fourth .square').at(2).simulate('click');
    // Simulate clicking the equal button
    wrapper.find('.calculator-row.fifth .equal').simulate('click');

    // Ensure the result is calculated correctly
    expect(wrapper.state('displayValue')).toEqual('8');
  });
});