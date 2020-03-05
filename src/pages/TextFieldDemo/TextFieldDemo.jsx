import React from 'react';
<<<<<<< HEAD
import { TextField } from '../../components/index';
=======
import { TextField, Slider } from '../../components/index';
>>>>>>> 9d5604de1ab789ff22acb57af529807ef23b3e03
import { Para } from '../../components/TextField/style';
// import { banners } from '../../configs/constant';

export default function TextFieldDemo() {
  return (
    <>
      <Slider altText="hello" banners defaultBanner="default.png" duration={2000} height={200} random />
      <Para>This is a Disabled Input</Para>
      <TextField value="Disabled Input" disabled />
      <Para>A Valid Input</Para>
      <TextField value="Accessible" />
      <Para>An Input with errors</Para>
      <TextField value={101} error="Could not be greater then" />
    </>
  );
}
