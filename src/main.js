/* eslint-disable no-undef */
import './css/style.css';
import './sass/style.sass';

async function test() {
   let data = await setTimeout(() => {
    console.log('我是data');
    // return 10
  }, 3000)
  console.log(data, 's');
  
}
console.log('我在函数外面');

test()
