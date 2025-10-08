import React from "react";

export default function ResetPassword() {
  return (
    <div>
      <h2>Reset Password</h2>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
