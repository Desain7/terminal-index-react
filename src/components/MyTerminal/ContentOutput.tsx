import React, { useEffect, Fragment } from "react";
import smartText from "@/utils/smartText";
import OutputType = MyTerminal.OutputType;
import { Tag } from "antd";

// TODO: 样式修改

interface OutputProps {
  output: OutputType;
}

function ContentOutput(props: OutputProps) {
  const { output } = props;
  const [outputTagColor, setOutputTagColor] = React.useState("");
  useEffect(() => {
    if (!output.status) {
      setOutputTagColor("");
    }
    switch (output.status) {
      case "info":
        setOutputTagColor("dodgerblue");
      case "success":
        setOutputTagColor("limegreen");
      case "warning":
        setOutputTagColor("darkorange");
      case "error":
        setOutputTagColor("#c0300f");
      case "system":
        setOutputTagColor("#bfc4c9");
      default:
        setOutputTagColor("");
    }
  }, [output.status]);

  const { component: Component } = output;
  return (
    <div className="content-output">
      {output.type === "text" && (
        <Fragment>
          {outputTagColor && <Tag color={outputTagColor}>{output.status}</Tag>}
          {output.type === "text" && (
            <span
              className="output w-95/100 whitespace-normal"
              dangerouslySetInnerHTML={{ __html: smartText(output.text) }}
            ></span>
          )}
        </Fragment>
      )}
      {output.type === "component" && <Component {...output.props} />}
    </div>
  );
}

export default ContentOutput;
