import React from 'react';
import { TextField } from '../../components/index';
import { Para } from '../../components/TextField/style';
import { banners } from '../../configs/constant';
import Slider from '../../components/Slider/index';

export default function TextFieldDemo() {
  return (
    <>
      <Slider altText="hello" banners={banners} defaultBanner="default.png" duration={2000} height={200} random />
      <Para>This is a Disabled Input</Para>
      <TextField value="Disabled Input" disabled />
      <Para>A Valid Input</Para>
      <TextField value="Accessible" />
      <Para>An Input with errors</Para>
      <TextField value={101} error="Could not be greater then" />
    </>
  );
}
