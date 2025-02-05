export const spt =
  JSON.parse(localStorage.getItem("selectedSite") ?? '{"state":{}}').state
    ?.sptNo || "";
