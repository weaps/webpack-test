/* eslint-disable no-undef */
import './css/style.css';
import './sass/style.sass';
import test from './test'
// import $ from 'jquery'
console.log('webpackTest');
let obj = 'a';
console.log(obj)

let fn = () => {
  console.log(obj)
}
fn()

test()
console.log($)