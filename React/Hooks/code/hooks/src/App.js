import React from 'react';
import ReactDOM from 'react-dom';

let state = [];
let setters = [];
let stateIndex = 0;

function createSetter (index) {
  return function (newState) {
    state[index] = newState;
    render ();
  }
}

function useState (initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  setters.push(createSetter(stateIndex));
  let value = state[stateIndex];
  let setter = setters[stateIndex];
  stateIndex++;
  return [value, setter];
}

function render () {
  stateIndex = 0;
  effectIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'));
}

// 上一次的依赖值
let prevDepsAry = [];
let effectIndex = 0;

function useEffect(callback, depsAry) {
  // 判断callback是不是函数
  if (Object.prototype.toString.call(callback) !== '[object Function]') throw new Error('useEffect函数的第一个参数必须是函数');
  // 判断depsAry有没有被传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback();
  } else {
    // 判断depsAry是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw new Error('useEffect函数的第二个参数必须是数组');
    // 获取上一次的状态值
    let prevDeps = prevDepsAry[effectIndex];
    // 将当前的依赖值和上一次的依赖值做对比 如果有变化 调用callback
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true;
    // 判断值是否有变化
    if (hasChanged) {
      callback();
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry;
    effectIndex++;
  }
}

// 更高级的state
function useReducer (reducer, initialState) {
  // 利用useState 先开辟一片数据管理空间
  const [state, setState] = useState(initialState);
  // 定义符合redux思想的dispatch 负责分发管理action
  function dispatch (action) {
    // 根据action的type来更新state并返回 都是符合redux思想的
    // 只不过这里的reducer由用户来自定义，返回最新的state交给setState来更新，所以核心是useState
    const newState = reducer(state, action);
    setState(newState);
  }
  return [state, dispatch];
}

function App() {
  function reducer (state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  }
  const [count, dispatch] = useReducer(reducer, 0);
  return <div>
    {count}
    <button onClick={() => dispatch({type: 'increment'})}>+1</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-1</button>
  </div>;
}

export default App;
