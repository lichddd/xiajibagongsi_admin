import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import Login from '../src/views/login.vue'

import axios from 'axios'

Vue.use(ElementUI);
let mounter

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({
    data: {
      code:0,
    }
  }))
}))
window.axios=axios;

let islogin=false;


beforeEach(() => {
  mounter = mount(Login,{
    mocks: {
      $router:{
        replace: jest.fn(() =>{
          islogin=true;

        })
      },
      $route:{
        query:{
          redirect:""
        }
      }
    }
  }) // 每次测试前确保我们的测试实例都是是干净完整的。返回一个wrapper对象
})
test('Should have the expected html structure', () => {
  expect(mounter.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
})
test('Should have two input & one button', () => {
  const inputs = mounter.findAll('.el-input') // 通过findAll来查找dom或者vue实例
  const loginButton = mounter.find('.el-button') // 通过find查找元素
  expect(inputs.length).toBe(2) // 应该有两个输入框
  expect(loginButton).toBeTruthy() // 应该有一个登录按钮。 只要断言条件不为空或这false，toBeTruthy就能通过。
})

test('成功 to login if not typing the correct password', async () => {
  mounter.setData({
    $route:{
      query:{
        redirect:"1111"
      }
    }
  });


  mounter.setData({
    form:{
      user:"111",
      password:"111",
    }
  }) // 模拟用户输入数据
  await (()=> new Promise((resolve,reject)=>{
    mounter.vm.login();
    setTimeout(()=>{

      expect(islogin).toBe(false);
      resolve();

    },0);
  }))();
  mounter.setData({
    form:{
      user:"111111111",
      password:"1111111111",
    }
  }) // 模拟用户输入数据
  await (()=> new Promise((resolve,reject)=>{
    mounter.vm.login();
    setTimeout(()=>{

      expect(islogin).toBe(true);
      resolve();

    },0);
  }))();



  mounter.destroy();

})
