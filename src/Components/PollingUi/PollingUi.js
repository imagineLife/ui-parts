import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';

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

// async function postMsgs(user, text) {
//   const msgData = {
//     user,
//     text,
//   };

//   const fetchOpts = {
//     method: 'POST',
//     body: JSON.stringify(msgData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   return fetch(POLLING_API_URL, fetchOpts);
// }

async function getMsgs() {
  let jsonFromApi;
  try {
    const res = await fetch(POLLING_API_URL);

    // something went wrong!
    if (res.status >= 400) {
      // error gets caught in the catch block below
      throw new Error('polling request errored with status', res.status);
    }

    const { msg } = await res.json();
    jsonFromApi = msg;
    // render(jsonFromApi);

    failedPollingCount = 0;
  } catch (e) {
    console.error('Polling error: ', e);
    failedPollingCount++;
  }

  /*
    setTImeout to poll is a more "trivial" approach
    requestAnimationFrame is a less persistent and more ui-aware approach
    THIS is replaced with rafFn below
  */
  // setTimeout(getMsgs, POLL_INTERVAL)
}










const usePollingMessages = () => {
  const timeToMakeNextPoll = useRef(0);
  const BACKOFF_TIME = 2000;
  // const [msgs] = useState(); //setMsgs
  const [count, setCount] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // const animate = (time) => {
  //   if (previousTimeRef.current != undefined) {
  //     const deltaTime = time - previousTimeRef.current;

  //     // Pass on a function to the setter of the state
  //     // to make sure we always have the latest state
  //     setCount((prevCount) => (prevCount + deltaTime * 0.001));
  //   }
  //   previousTimeRef.current = time;
  //   requestRef.current = requestAnimationFrame(animate);
  // };

  async function animate(s) {
    console.log('animate s',s)
    
    if (timeToMakeNextPoll.current <= s) {
      console.log('calling getMsgs')
      
      await getMsgs();
      timeToMakeNextPoll.current = s + POLL_INTERVAL + failedPollingCount * BACKOFF_TIME;
    }
    
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return { messages: count, error: false };
};










const PollingUi = () => {
  return (
    <div>
      <h2>Polling UI</h2>
    </div>
  );
};
export default PollingUi;

/*
  const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");


// a submit listener on the form in the HTML
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postMsgs(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

function render(msgArr) {
  // as long as msgsArr is holding all current messages, this will render them
  // into the ui. yes, it's inefficent. yes, it's fine for this example
  const html = msgArr.map(({ user, text, time, id }) => msgString(user, text, time, id));
  msgs.innerHTML = html?.join("\n");
}

// A Trivial way to start the polling:
// make the first request
// REPLACED with code below
// getMsgs();


// a more browser-friendly version beside setTimeout
// gets called ... a lot.... like a lot.....the POLL_INTERVAL keeps the fetch happening less frequently
const BACKOFF_TIME = 5000;
async function rafFn(s) {
  if (timeToMakeNextPoll <= s) {
    await getMsgs()
    timeToMakeNextPoll = s + POLL_INTERVAL + (failedPollingCount * BACKOFF_TIME);
  }
  requestAnimationFrame(rafFn)
}

requestAnimationFrame(rafFn);
*/
