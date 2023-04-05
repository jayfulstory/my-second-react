import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store.js';
import { changeName, increaseAge } from './../store/userSlice.js';

function Cart() {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <div>
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
                // console.log(val.id);
                dispatch(add(val.id));
              }}
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    );
  });
}

export default Cart;
