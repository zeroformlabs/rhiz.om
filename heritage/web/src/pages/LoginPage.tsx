import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>rhiz.om</h1>
      <p>You&apos;re here. That&apos;s enough to begin.</p>
      <p>This is a place to pause, notice, and connect.</p>
      <button type='button' onClick={() => void loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginPage;
