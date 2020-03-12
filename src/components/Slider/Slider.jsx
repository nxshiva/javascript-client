import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/math';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constant';
import Img from './style';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: -1,
    };
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    console.log('Inside did mount');
    this.id = setInterval(() => {
      let { current } = this.state;
      if (random && banners.length) {
        current = getRandomNumber(banners.length);
        console.log('current random', current);
      } else if (banners.length) {
        current = getNextRoundRobin(banners.length, current);
        console.log('current round robin', current);
      }

      this.setState({ current });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const {
      altText, height, banners, defaultBanner,
    } = this.props;
    const { current } = this.state;
    let path;
    if (current === -1) {
      if (defaultBanner) {
        console.log('inside default banner');
        path = `${PUBLIC_IMAGE_FOLDER}banners/${defaultBanner}`;
      } else {
        console.log('not inside default banner');
        path = PUBLIC_IMAGE_FOLDER + DEFAULT_BANNER_IMAGE;
      }
    } else {
      path = PUBLIC_IMAGE_FOLDER + banners[current];
    }
    console.log('path', path);
    return (
      <Img src={path} alt={altText} height={height} />
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  defaultBanner: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: 'default.png',
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
