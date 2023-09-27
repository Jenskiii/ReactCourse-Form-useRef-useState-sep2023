import { useState, useMemo } from "react";
import { checkEmail,checkPassword } from "./validators";

export function StateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  const emailErrors = useMemo(() => {
    return isAfterFirstSubmit ? checkEmail(email) : [];
  }, [isAfterFirstSubmit, email]);

  const passwordErrors = useMemo(() => {
    return isAfterFirstSubmit ? checkPassword(password) : [];
  }, [isAfterFirstSubmit, password]);

  function onSubmit(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    setIsAfterFirstSubmit(true);

    const emailResults = checkEmail(email);
    const passwordResults = checkEmail(password);

    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Succes");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="form" noValidate>
        <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            className="input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
        </div>

        <div
          className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}
        >
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />

          {passwordErrors.length > 0 && (
            <div className="msg">{passwordErrors.join(", ")}</div>
          )}
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
