import React from "react";

export default function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
