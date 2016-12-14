import React from 'react';

function LoginModal() {
  return (
    <div>
      <h2 className="Modal__heading">Hello there!</h2>

      <form>
        <label htmlFor="name">
          Name
        </label>
        <input type="text" />
        <label htmlFor="email">
          Email address
        </label>
        <input type="email" />
      </form>
    </div>
  );
}


export default LoginModal;
