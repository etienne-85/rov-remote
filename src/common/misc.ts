export const fetchRemoteUrl = async (url: string) => {
  console.log("fetching " + url);
  const opt: RequestInit = { mode: "cors" };
  try {
    let response = await fetch(url, opt);
    let txt = await response.text();
    return txt;
  } catch (e) {
    console.log(e);
  }
};
