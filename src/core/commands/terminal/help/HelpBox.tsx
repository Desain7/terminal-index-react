import React from "react";
import { commandList } from "../../../commandRegister";
import { Col, Row } from "antd";
function HelpBox() {
  return (
    <div>
      <div>
        使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
      </div>
      <div>命令列表：</div>
      {commandList.map((command, index) => {
        return (
          <div key={index}>
            <Row gutter={16}>
              <Col span={4}>{command.func}</Col>
              <Col span={4}>{command.name}</Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
}

export default HelpBox;
