import React, { Component } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components/index';
import { Para } from '../../components/TextField/style';
import { SelectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constant';


class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.schema = yup.object().shape({
      name: yup.string().required('Please enter your name').min(3, 'Please enter no less than 3 characters'),
      sport: yup.string().required('Please select a sport'),
      cricket: yup.string().when('sport', {
        is: 'cricket',
        then: yup.string().required('What you do is required'),
      }),
      football: yup.string().when('sport', {
        is: 'football',
        then: yup.string().required('What you do is required'),
      }),
    });
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  onChangeTextField = (e) => {
    let { name } = this.state;
    name = e.target.value;
    this.setState({ name });
  }

  onChangeSelectField = (e) => {
    let { sport, cricket, football } = this.state;
    sport = e.target.value;
    if (sport === 'select') {
      sport = '';
    }
    cricket = '';
    football = '';
    this.setState({ sport, cricket, football });
  }

  onChangeRadioGroup = (e) => {
    const { sport } = this.state;
    let { cricket, football } = this.state;
    if (sport === 'cricket') {
      cricket = e.target.value;
      football = '';
      this.setState({ cricket, football });
    } else if (sport === 'football') {
      football = e.target.value;
      cricket = '';
      this.setState({ football, cricket });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;
    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    if (this.state.touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  };

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <form>
        <Para>Name</Para>

        <TextField onChange={this.onChangeTextField} value={name} error={this.getError('name')} onBlur={() => this.isTouched('name')} />
        <Para>Select the game you play?</Para>
        <SelectField defaultText="select" options={SelectOptions} onChange={this.onChangeSelectField} values={sport} error={this.getError('sport')} onBlur={() => this.isTouched('sport')} />
        {sport && (sport === 'cricket' || sport === 'football') && (
          <>
            <Para>What you do?</Para>
            <RadioGroup options={this.getRadioOptions()} onChange={this.onChangeRadioGroup} error={this.getError(sport)} onBlur={() => this.isTouched(sport)} />
          </>
        )}
        <div align="right">
          <Button
            value="cancel"
          />
          <Button
            value="submit"
            disabled={this.hasErrors()}
          />
        </div>
      </form>
    );
  }
}

export default InputDemo;
