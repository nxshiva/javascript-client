import React, { Component } from 'react';

import {
  TextField, SelectField, RadioGroup,
} from '../../components/index';
import { Para } from '../../components/TextField/style';
import { SelectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constant';


class InputDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  onChangeTextField = (e) => {
    let { name } = this.state;
    name = e.target.value;
    this.setState({ name }, () => {
      console.log(this.state);
    });
  }

  onChangeSelectField = (e) => {
    let { sport, cricket, football } = this.state;
    sport = e.target.value;
    cricket = '';
    football = '';
    this.setState({ sport, cricket, football }, () => {
      console.log(this.state);
    });
  }

  onChangeRadioGroup = (e) => {
    const { sport } = this.state;
    let { cricket, football } = this.state;
    if (sport === 'cricket') {
      cricket = e.target.value;
      football = '';
      this.setState({ cricket, football }, () => {
        console.log(this.state);
      });
    } else if (sport === 'football') {
      football = e.target.value;
      cricket = '';
      this.setState({ football, cricket }, () => {
        console.log(this.state);
      });
    }
    console.log(e.target.value);
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  render() {
    const { sport, name } = this.state;
    return (
      <>
        <Para>Name</Para>
        <TextField onChange={this.onChangeTextField} value={name} />
        <Para>Select the game you play?</Para>
        <SelectField defaultText="Select" options={SelectOptions} onChange={this.onChangeSelectField} values={sport} />
        {sport && (sport === 'cricket' || sport === 'football') && (
          <>
            <Para>What you do?</Para>
            <RadioGroup options={this.getRadioOptions()} onChange={this.onChangeRadioGroup} />
          </>
        )}
      </>
    );
  }
}

export default InputDemo;
