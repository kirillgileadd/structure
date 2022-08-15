import React, { useEffect, useState } from "react";
import { OrgChartComponent } from "./OrgChartComponent";
import * as d3 from "d3";


export const Structure = () => {
  const [chosenNode, setChosenNode] = useState("");
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: "new Node",
      parentNodeId: "O-6066",
    };

    addNodeChildFunc(node);
  }

  const onNodeClickHandler = async (node) => {
    console.warn("node onNodeClickHandler", node);
    setChosenNode(node);
  };

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((data) => {
      setData(data);
    });
  }, [true]);

  return (
    <>
      <OrgChartComponent
        setClick={(click) => {
          addNodeChildFunc = click;
        }}
        data={data}
        onNodeClick={onNodeClickHandler}
        chosenNode={chosenNode}
      />
    </>
  );
};
