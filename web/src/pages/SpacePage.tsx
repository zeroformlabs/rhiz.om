import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import { ApiMeResponse } from "@rhizom/types/api-types";

const SpacePage = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();

  const handleApiCall = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = (await response.json()) as ApiMeResponse;
      console.log("API Response:", data);
      alert("Check the console for the API response.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Welcome to your Space, {user?.name}</h2>
      <p>This is a protected area.</p>
      <button type="button" onClick={handleApiCall}>Call Protected API</button>
      <button type="button" onClick={() => logout({ logoutParams: { returnTo: globalThis.window.location.origin } })}>
        Log Out
      </button>
    </div>
  );
};

export default SpacePage;
