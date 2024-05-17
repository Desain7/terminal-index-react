import React from "react";
import { shortcutList } from "@/components/MyTerminal/shortcuts";
import { Col, Row } from "antd";

function ShortcutBox() {
  return (
    <div>
      <div>快捷键：</div>
      {shortcutList.map((shortcut, index) => {
        return (
          <div key={index}>
            {shortcut.keyDesc && (
              <Row>
                <Col span={4}>{shortcut.keyDesc ?? shortcut.code}</Col>
                <Col span={4}>{shortcut.desc}</Col>
              </Row>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ShortcutBox;
