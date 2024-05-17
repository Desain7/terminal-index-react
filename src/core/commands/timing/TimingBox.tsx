import { Button } from "antd";
import React, { useEffect, useState, Fragment } from "react";

interface TimingBoxProps {
  seconds: string;
}

function TimingBox(props: TimingBoxProps) {
  const { seconds } = props;
  // 剩余时间
  const [leftTime, setLeftTime] = useState(Number(seconds));
  // 是否正在运行
  const [start, setStart] = useState(true);

  const toggleStart = () => {
    setStart(!start);
  };
  useEffect(() => {
    // 定时器
    let timer: any;
    if (!leftTime) {
      return;
    }
    timer = setInterval(() => {
      if (start) {
        setLeftTime(leftTime - 1);
      }
      if (leftTime <= 0) {
        alert(`${seconds} 秒倒计时结束`);
        if (timer) {
          clearInterval(timer);
        }
      }
    }, 1000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <div>
      <div>倒计时：{seconds} 秒</div>
      <div>剩余：{leftTime} 秒</div>
      {leftTime > 0 && (
        <Fragment>
          {start ? (
            <Button size={"small"} ghost danger onClick={toggleStart}>
              暂停
            </Button>
          ) : (
            <Button size={"small"} ghost onClick={toggleStart}>
              继续
            </Button>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default TimingBox;
