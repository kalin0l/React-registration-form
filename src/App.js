import React, { useState } from 'react';
import useInput from './Use-input'

function App() {

  const [people, setPeople] = useState([]);

  const { value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    touchedHandler: nameTouched,
    inputHandler: nameHandler,
    reset: resetName } = useInput(value => value.trim() !== '');
  const { value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    touchedHandler: emailTouched,
    inputHandler: emailHandler,
    reset: resetEmail } = useInput(value => value.includes('@'));
  const { value: pass,
    hasError: passHasError,
    isValid: passIsValid,
    touchedHandler: passTouched,
    inputHandler: passHandler,
    reset: resetPass } = useInput(value => value !== '' && value.length > 5);
  const { value: confirmPass,
    hasError: confirmPassHasError,
    isValid: confirmPassIsValid,
    touchedHandler: confirmPassTouched,
    inputHandler: confirmPassHandler,
    reset: resetConfirmPass } = useInput(value => value === pass);

  const nameClass = nameHasError ? 'input invalid' : 'input';
  const emailClass = emailHasError ? 'input invalid' : 'input';
  const passClass = passHasError ? 'input invalid' : 'input';
  const confirmPassClass = confirmPassHasError ? 'input invalid' : 'input';

  let formIsValid = false;
  if (nameIsValid && emailIsValid && passIsValid && confirmPassIsValid) {
    formIsValid = true;
  }

const removeUser = (id) => {
  setPeople(people.filter(person => person.id !== id));
}

const submitHandler = (e) => {
  e.preventDefault();
  
    if (!formIsValid) {
      return;
    }
    const person = { id: new Date().getTime().toString(), name, email, };
    setPeople([...people, person]);

    console.log(name, email, pass, confirmPass);

    resetName();
    resetEmail();
    resetPass();
    resetConfirmPass();
  }

  return (
    <section>
      <form className='reg-form' onSubmit={submitHandler}>
        <h1>Registration Form</h1>
        <label className='label'>
          Name
          <input type='text' className={nameClass} onChange={nameHandler} onBlur={nameTouched} />
          {nameHasError && <p className='error'>Name should be valid!</p>}
        </label>
        <label className='label'>
          Email adress
          <input type='email' className={emailClass} onChange={emailHandler} onBlur={emailTouched} />
          {emailHasError && <p className='error'>Email should be valid!</p>}
        </label>
        <label className='label'>
          Password
          <input type='password' className={passClass} onChange={passHandler} onBlur={passTouched} />
          {passHasError && <p className='error'>Password should be valid!</p>}
        </label>
        <label className='label'>
          Confirm password
          <input type='password' className={confirmPassClass} onChange={confirmPassHandler} onBlur={confirmPassTouched} />
          {confirmPassHasError && <p className='error'>The passwords does not match!</p>}
        </label>
        <button type='submit' disabled={!formIsValid} className='btn'>Submit</button>
      </form>
      <div>
        {people.map(p => {
          const { name, id, email } = p;
          return <div onClick={() => removeUser(id)} className='person-container' key={id}>
            <h1>Registered user</h1>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        })}
      </div>

    </section>


  );
}

export default App;
