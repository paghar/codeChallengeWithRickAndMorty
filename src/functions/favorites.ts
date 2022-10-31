export const saveFavoritesToDB = (favorites: string[]) => {
  fetch(
    "/api/favorites",
    {
      method:"PUT",
      body: JSON.stringify({
        favoriteList: favorites.join(":"),
      })
    }
  )
}

export const getFavoritesFromDB = async () => {
  const favorites = await fetch("/api/favorites").then((res) => {
    return res.json();
  })
  .then((result) => {
    return result.favorites;
  });

  const returnCode: string[] = favorites ? favorites.split(":") : [];
  return returnCode;
}