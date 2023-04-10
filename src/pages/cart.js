import { memo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCount } from '../store.js';
import { changeName, increaseAge } from '../store/userSlice.js';

// memoはpropsが変わる時だけ再レンダリング
const Child = memo(() => {
  // console.log('render');
  return <div>child</div>;
});

function f() {
  for (let i = 0; i < 10000000000; i++) {
    console.log(i);
  }
}

function Cart() {
  // コンポーネントがレンダリングする時１回だけ実行
  // [state]<<stateは変わる時だけ
  // const result = useMemo(() => {
  //   return f();
  // }, [state]);
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child count={count}></Child>
      <button onClick={() => setCount(count + 1)}>+</button>
      <h4>
        {state.name}
        {state.age}
      </h4>
      <button
        onClick={() => {
          dispatch(increaseAge(1));
        }}
      >
        button
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <Tbody></Tbody>
      </Table>
    </div>
  );
}

function Tbody() {
  const state = useSelector(state => state.cart);
  // const newA = [...state];
  const dispatch = useDispatch();
  return state.map((val, index) => {
    return (
      <tbody key={index}>
        <tr>
          <td>{val.id}</td>
          <td>{val.name ? val.name : val.title}</td>
          <td>{val.count}</td>
          <td>
            <button
              onClick={() => {
                dispatch(updateCount({ id: val.id, type: 'add' }));
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch(updateCount({ id: val.id, type: 'subtract' }));
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                dispatch(updateCount({ id: val.id, type: 'delete' }));
              }}
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    );
  });
}

export default Cart;
