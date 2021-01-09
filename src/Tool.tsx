import { useState, useEffect } from "react";
import { fetchRemoteUrl } from "./common/misc";
import React from "react";

/**
 * Override with your own code
 */

const EXT_FILE_URL =
  "https://gist.githubusercontent.com/etienne1911/c8ebbb56597fba3c610d4fea825758c2/raw/external_sample.csv";

export default ({ args }: any) => {
  return (
    <>
      <div>ToolPage (make your tool from here)</div>
      <hr />
      <div> provided url arguments: </div>
      {args.remoteUrl}
      <hr />
      <div> Usecases: </div>
      <a href="?remoteUrl=sample.txt"> internal file </a>
      <br />
      <a href={"?remoteUrl=" + EXT_FILE_URL}> external file </a>
      <hr />
      <FileLoadHelper fileUrl={args.remoteUrl} />
    </>
  );
};

const FileLoadHelper = ({ fileUrl }: any) => {
  const [data, setData] = useState("no url provided");

  useEffect(() => {
    (async () => {
      if (fileUrl) {
        const remoteFileData: any = await fetchRemoteUrl(fileUrl);
        setData(remoteFileData);
      }
    })();
  });

  return (
    <>
      File content:
      <br />
      {data}
    </>
  );
};
