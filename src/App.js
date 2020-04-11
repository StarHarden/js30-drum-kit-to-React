import React, { useRef, useEffect } from 'react';
import './App.css';

// useRef: a react hook that gives you access to any DOM element

// put finger on keyboard
// browser detects a keydown event
  // use the keydown event to determine which key was pressed

// react hooks lives at the top level of your component

// critical concept: think about the order in which things are run / executed? 

function App() {

  function playSound(e) {
    // Goal: take e.keyCode's value, 
      //then find the audio element that has data-key attribute with the same value
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // stop the function and exit

    audio.currentTime = 0; // rewind to the begining
    audio.play();
    key.classList.add('playing');
  }

  function removeTransition(e) {
    if (e.propertyName !== 'transform') return // skip it if it's not a transorm
   this.classList.current.remove('playing');
  }

  const keys = document.querySelectorAll('.key');
  console.log('keys grabbed using querySelectAll', keys);
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown',playSound);


  const keysReference = useRef(null);
  const keysDivElement = keysReference.current === null ? { children: [] } : keysReference.current;
  keysDivElement.children.forEach(key => key.addEventListener('transitionend', removeTransition))


  // this will be called when React DOM is rendered
  useEffect(
    () => {
      const keys = document.querySelectorAll('.key');
      console.log('keys grabbed using useEffect', keys);
      keys.forEach(key => key.addEventListener('transitionend', removeTransition));
      window.addEventListener('keydown',playSound);
    }
  )
 
   return (
    <>
      <div className="keys" ref={keysReference}>
        <div data-key="65" className="key">
          <kbd>A</kbd>
          <span className="sound">clap</span>
        </div>
        <div data-key="83" className="key">
          <kbd>S</kbd>
          <span className="sound">hihat</span>
        </div>
        <div data-key="68" className="key">
          <kbd>D</kbd>
          <span className="sound">kick</span>
        </div>
        <div data-key="70" className="key">
          <kbd>F</kbd>
          <span className="sound">openhat</span>
        </div>
        <div data-key="71" className="key">
          <kbd>G</kbd>
          <span className="sound">boom</span>
        </div>
        <div data-key="72" className="key">
          <kbd>H</kbd>
          <span className="sound">ride</span>
        </div>
        <div data-key="74" className="key">
          <kbd>J</kbd>
          <span className="sound">snare</span>
        </div>
        <div data-key="75" className="key">
          <kbd>K</kbd>
          <span className="sound">tom</span>
        </div>
        <div data-key="76" className="key">
          <kbd>L</kbd>
          <span className="sound">tink</span>
        </div>
      </div>

      <audio data-key="65" src="sounds/clap.wav"></audio>
      <audio data-key="83" src="sounds/hihat.wav"></audio>
      <audio data-key="68" src="sounds/kick.wav"></audio>
      <audio data-key="70" src="sounds/openhat.wav"></audio>
      <audio data-key="71" src="sounds/boom.wav"></audio>
      <audio data-key="72" src="sounds/ride.wav"></audio>
      <audio data-key="74" src="sounds/snare.wav"></audio>
      <audio data-key="75" src="sounds/tom.wav"></audio>
      <audio data-key="76" src="sounds/tink.wav"></audio>
    </>

  );
}
 

export default App;
