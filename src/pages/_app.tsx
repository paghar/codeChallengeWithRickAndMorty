import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import Layout from "../ui/layout";
import { useEffect, useReducer } from "react";
import { appState, AppTypeKeys, initialAppState } from "../reducers/app";
import { getFavoriteCookie } from "../functions/cookie";
import { uniq } from "lodash";
import { getFavoritesFromDB } from "../functions/favorites";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [appComponentState, dispatch] = useReducer(appState, initialAppState);

  const addFavorite = (index: string) => {
    dispatch({
      type: AppTypeKeys.ADD_FAVORITE,
      data: index,
    });
  };

  const removeFavorite = (index: string) => {
    dispatch({
      type: AppTypeKeys.REMOVE_FAVORITE,
      data: index,
    });
  };


  useEffect(() => {
    const checkFavorites = async () => {
      const favoriteDatabase = await getFavoritesFromDB();
      const favoriteCookie = getFavoriteCookie();
      if(typeof document != "undefined") {
        if(favoriteCookie.length > 0 && favoriteDatabase.length == 0) {
          dispatch({
            type: AppTypeKeys.SET_FAVORITE_BY_COOKIE,
            data: favoriteCookie,
          });
        }
        else if(favoriteCookie.length == 0 && favoriteDatabase.length > 0) {
          dispatch({
            type: AppTypeKeys.SET_FAVORITE_BY_DATABASE,
            data: favoriteDatabase,
          });
        } else if(favoriteCookie.length > 0 && favoriteDatabase.length > 0) {
          dispatch({
            type: AppTypeKeys.MERGE_FAVORITE,
            data: uniq(favoriteCookie.concat(favoriteDatabase)),
          })
        }
      }
    };
    checkFavorites();
  }, [])

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component
          {...pageProps}
          {...appComponentState}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favoriteList={appComponentState.favorites}
        />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
