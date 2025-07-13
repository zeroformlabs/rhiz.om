import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>rhiz.om</h1>
      <p>You’re here. That's enough to begin.</p>
      <p>This is a place to pause, notice, and connect.</p>
      <button type='button' onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginPage;
