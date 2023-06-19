import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useCallback } from 'react';
import useAnimationFrame from '../../Hooks/useAnimationFrame';

// const API_HOST = process.env.API_HOST || 'localhost:3000';
const API_HOST = 'http://localhost:3000';
const POLL_INTERVAL = 1000;
const POLLING_API_URL = `${API_HOST}/poll`;
let failedPollingCount = 0;

const Message = (user, msg) => (
  <li className="collection-item">
    <span className="badge">{user}</span>
    {msg}
  </li>
);

// async function getMsgs() {
//   let jsonFromApi;
//   try {
//     const res = await fetch(POLLING_API_URL);

//     // something went wrong!
//     if (res.status >= 400) {
//       // error gets caught in the catch block below
//       throw new Error('polling request errored with status', res.status);
//     }

//     const { msg } = await res.json();
//     jsonFromApi = msg;
//     // render(jsonFromApi);

//     failedPollingCount = 0;
//   } catch (e) {
//     console.error('Polling error: ', e);
//     failedPollingCount++;
//   }

//   /*
//     setTImeout to poll is a more "trivial" approach
//     requestAnimationFrame is a less persistent and more ui-aware approach
//     THIS is replaced with rafFn below
//   */
//   // setTimeout(getMsgs, POLL_INTERVAL)
// }










const PollingUi = () => {

  const [count, setCount] = useState(0);

  const setCountFn = useCallback(
    (deltaTime) =>
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setCount((prevCount) => (prevCount + deltaTime * 0.001) % 100),
    []
  );

  useAnimationFrame(setCountFn);
  return (
    <div>
      <h2>Polling UI</h2>
      <p>Count: {count}</p>
    </div>
  );
};
export default PollingUi;