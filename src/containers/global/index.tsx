import { LocalStorageKeys } from "@/shared/utils/localStorageHelpers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { globalActions } from "./slice";
import { useWeb3Auth } from "./Web3AuthProvider";

export const GlobalProvider = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user, provider, logout, login } =
    useWeb3Auth() || {};

  useEffect(() => {
    dispatch(globalActions.fetchData());
    dispatch(globalActions.fetchTokencodes());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && login) {
      // The core provider's login rejects when the modal is closed or the
      // connection fails; there is nothing to recover, so just log it.
      login().catch((error) => console.error("Login error:", error));
      return;
    }
    // Wait for the normalized user (and its id token) — it lands a render
    // after isAuthenticated flips.
    if (isAuthenticated && user && login && logout) {
      if (user.idToken) {
        localStorage.setItem(LocalStorageKeys.jwtAccessKey, user.idToken);
      }
      dispatch(
        globalActions.setAuthData({
          login,
          isLoading: !!isLoading,
          isAuthenticated,
          userWeb3: user,
          logout,
          provider: provider ?? null,
          error: null,
        })
      );
    }
  }, [isLoading, isAuthenticated, user, provider, login, logout, dispatch]);

  return null;
};
