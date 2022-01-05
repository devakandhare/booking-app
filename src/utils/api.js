export default function getData(url) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was problem fetching data");
    }
    return resp.json();
  });
}
