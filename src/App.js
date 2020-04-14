import React, { useLayoutEffect, useRef } from 'react';
import './sounds/audio';
import './App.css';

// useRef: a react hook that gives you access to any DOM element

// put finger on keyboard
// browser detects a keydown event
  // use the keydown event to determine which key was pressed

// react hooks lives at the top level of your component

// critical concept: think about the order in which things are run / executed? 

function App() {

  const keysReference = useRef(null);
  const key = useRef(null);
  const audio = useRef(null);

// this will be called when React DOM is rendered
  useLayoutEffect(
    () => {
      const keys = document.querySelectorAll('.key');
      console.log('keys grabbed using useLayoutEffect', keys);
      keys.forEach(key => key.addEventListener('transitionend', removeTransition));
      window.addEventListener('keydown',playSound);
    },
  )
    
  function playSound(e) {
    // Goal: take e.keyCode's value, 
      //then find the audio element that has data-key attribute with the same value
    const audio = document.querySelector(`audio[dataKey="${e.keyCode}"]`);
    const key = document.querySelector(`.key[dataKey="${e.keyCode}"]`);
    if (!audio) return; // stop the function and exit

    audio.currentTime = 0; // rewind to the begining
    audio.play();
    key.classList.add('playing');
  }

  function removeTransition(e) {
    
  if (e.propertyName !== 'transform') return // skip it if it's not a transorm
   this.classList.current.remove('playing');
  
  const keys = document.querySelectorAll('.key');
  // console.log('keys grabbed using querySelectAll', keys);
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown',playSound);

  const keysDivElement = keysReference.current === null ? { children: [] } : keysReference.current;
  keysDivElement.children.forEach(key => key.addEventListener('transitionend', removeTransition))
  

  } 
   return (
    <>
      <div className="keys" ref={keysReference}>
        <div dataKey="65" className="key">
          <kbd>A</kbd>
          <span className="sound">clap</span>
        </div>
        <div dataKey="83" className="key">
          <kbd>S</kbd>
          <span className="sound">hihat</span>
        </div>
        <div dataKey="68" className="key">
          <kbd>D</kbd>
          <span className="sound">kick</span>
        </div>
        <div dataKey="70" className="key">
          <kbd>F</kbd>
          <span className="sound">openhat</span>
        </div>
        <div dataKey="71" className="key">
          <kbd>G</kbd>
          <span className="sound">boom</span>
        </div>
        <div dataKey="72" className="key">
          <kbd>H</kbd>
          <span className="sound">ride</span>
        </div>
        <div dataKey="74" className="key">
          <kbd>J</kbd>
          <span className="sound">snare</span>
        </div>
        <div dataKey="75" className="key">
          <kbd>K</kbd>
          <span className="sound">tom</span>
        </div>
        <div dataKey="76" className="key">
          <kbd>L</kbd>
          <span className="sound">tink</span>
        </div>
      </div>

    </>

  );
}
 

export default App;
