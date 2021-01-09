import { useState, useEffect } from "react";
import React from "react";
import nipplejs from 'nipplejs';
import "./switch_btn.css"
import { RestApi, WebSockets } from "./WebInterfaces";

const MAX_SPEED = 255;

const rovCtrlInterface = new WebSockets();//new RestApi()
// const wsInterface = new WebSockets()

export default ({ args }: any) => {

  const param1: any = {
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: "red",
    lockX: true
  };

  const param2: any = {
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: "green",
    lockY: true
  };

  return (
    <>
      {/* <BasicControls/> */}
      {/* <SwitchToggle handler={rovCtrlInterface.togglePower} /> */}
      {/* <SwitchToggle handler={rovCtrlInterface.toggleMower} /> */}
      <JoyPad options={param1} />
      <JoyPad options={param2} />
    </>
  );
};

var speed = 0;
var moving = false;
var joyId = 0;

const keepAlive = () => {
  // ws.send(JSON.stringify({action: 'plus'}));

  // setInterval(() => {
  //   console.log("auto trigger move")
  //   // console.log(joystick)
  //   // joystick.trigger("move") 
  // }, 1000)
}

keepAlive();

const JoyPad = ({ options }: any) => {
  const [data, setData] = useState("no url provided");

  const ref: any = React.createRef();

  useEffect(() => {
    options.zone = ref.current;
    var manager: any = nipplejs.create(options);
    manager.on('start', onJoyStart)
    manager.on('move', onJoyMove)
    manager.on('end', onJoyEnd)
    const joystick = manager.get(1);
    console.log(joystick);
  });

  return (
    <>
      <div className="joypad" ref={ref} id="zone_joystick"></div>
    </>
  );
};


const SwitchToggle = ({ handler }: any) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const handleClick = () => {
    setIsToggleOn(!isToggleOn)
    handler(!isToggleOn)
  }
  // console.log("toggle state: " + isToggleOn)
  return (
    <>
      <label className="switch">
        <input type="checkbox" onClick={handleClick} />
        <span className="slider round"></span>
      </label>
    </>
  )
}

const onJoyStart = async (evt: any, joystick: any) => {
  joyId = joystick.id;
  console.log("start move: joy " + joyId)
}
const onJoyEnd = async (evt: any, data: any) => {
  console.log("END move")
  speed = 0;
  moving = false;
  // setTimeout(async () => {
  //   console.log("stopping")
  //   const res = rovCtrlInterface.speedControl({ left: 0, right: 0 })
  //   console.log(res);
  // }, 200)
  rovCtrlInterface.speedControl({ left: 0, right: 0 })
}

const onJoyMove = async (evt: any, data: any) => {
  // speed = Math.floor(data.vector.x * MAX_SPEED) ? Math.floor(data.vector.x * MAX_SPEED) : Math.floor(data.vector.y * MAX_SPEED);
  speed = !joyId ? Math.floor(data.vector.x * MAX_SPEED) : Math.floor(data.vector.y * MAX_SPEED);
  rovCtrlInterface.speedControl({ left: speed * (1 - 2 * joyId), right: speed })
  console.log("updated speed:" + speed)
}



const BasicControls = () => {
  const onForwardMove = async () => {
    // const remoteFileData: any = await fetchRemoteUrl("/move?left=" + LINEAR_SPEED + "&right=" + LINEAR_SPEED);
    // remoteFileData.then((data: any) => console.log(data))
    // console.log(remoteFileData);
    return {};
  }

  const onBackwardMove = async () => {
    // const remoteFileData: any = await fetchRemoteUrl("/move?left=-" + LINEAR_SPEED + "&right=-" + LINEAR_SPEED);
    return {};
  }

  const onLeftMove = async () => {
    // const remoteFileData: any = await fetchRemoteUrl("/move?left=" + TURN_SPEED + "&right=-" + TURN_SPEED);
    return {};
  }

  const onRightMove = async () => {
    // const remoteFileData: any = await fetchRemoteUrl("/move?left=-" + TURN_SPEED + "&right=" + TURN_SPEED);
    return {};
  }

  return (
    <>
      <button className="navigation" onClick={onForwardMove}>FORWARD</button>
      <br />
      <button className="navigation" onClick={onLeftMove}>LEFT</button>
      <button className="navigation" onClick={onRightMove}>RIGHT</button>
      <br />
      <button className="navigation" onClick={onBackwardMove}>BACKWARD</button>
      <br />
    </>
  );
};
