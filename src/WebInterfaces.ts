import { fetchRemoteUrl } from "./common/misc";

// other name WebCommunications, CommunicationInterfaces
export enum InterfaceTypes {
    WebSockets,
    RestApi
}

class WebInterface {

    TIME_THRESHOLD = 500;
    ongoingReq = 0;
    lastTime: any = new Date();
    speed = { left: 0, right: 0 }

    // currIface;

    // constructor(type: InterfaceTypes) {
    //     this.currIface = type === InterfaceTypes.WebSockets ? new WebSocketsInterface : new RestApiInterface;
    // }

    speedControl = async (speed: any) => {
    }

    togglePower = async (isActivated: any) => {
        console.log("Power state: " + isActivated)
    }

    toggleMower = async (isActivated: any) => {
        console.log("Mower state: " + isActivated)
    }


}

export class WebSockets extends WebInterface {

    ws = new WebSocket(`ws://${window.location.hostname}/ws`);

    constructor() {
        super();
        this.ws.onmessage = function (event) {
            // const content = document.createTextNode(event.data);
            console.log(event.data)
        };

        this.ws.onopen = (event) => {
            console.log('Connection opened');
        }

        this.ws.onclose = (event) => {
            console.log('Connection closed');
            // setTimeout(initWebSocket, 2000);
        }
    }

    speedControl = async (speed: any) => {
        // var time: any = new Date();
        // var elapsed: any = time - this.lastTime;
        this.speed = speed;
        // if (!this.ongoingReq) {
            // this.ongoingReq++;
            // do {
                // this.lastTime = new Date();
                var lastSpeed = this.speed;
                console.log("Setting speed: left=" + this.speed.left + "&right=" + this.speed.right)
                // console.log(this.speed)
                // await fetchRemoteUrl(this.REST_API_SRV + "/move?left=" + this.speed.left + "&right=" + this.speed.right);
                const data = JSON.stringify(speed);
                try {
                    this.ws.send(data) //send data to the server
                } catch (error) {
                    console.log(error) // catch error
                }
                // time = new Date();
                // elapsed = time - this.lastTime;
                // console.log("done " + elapsed + " ms");
            // }
            // while (lastSpeed.left !== this.speed.left || lastSpeed.right !== this.speed.right);
            // this.ongoingReq--;
        // }
    }
}

export class RestApi extends WebInterface {
    REST_API_SRV = "/rov_control_api";

    speedControl = async (speed: any) => {
        var time: any = new Date();
        var elapsed: any = time - this.lastTime;
        this.speed = speed;
        if (!this.ongoingReq) {
            this.ongoingReq++;
            do {
                this.lastTime = new Date();
                var lastSpeed = this.speed;
                console.log("Setting new speed:")
                console.log(this.speed)
                await fetchRemoteUrl(this.REST_API_SRV + "/move?left=" + this.speed.left + "&right=" + this.speed.right);
                time = new Date();
                elapsed = time - this.lastTime;
                console.log("done " + elapsed + " ms");
            }
            while (lastSpeed.left !== this.speed.left || lastSpeed.right !== this.speed.right);
            this.ongoingReq--;
        }
    }

    togglePower = async (isActivated: any) => {
        const state = isActivated ? 1 : 0;
        await fetchRemoteUrl("/rov_control_api/power?state=" + state);
    }

    toggleMower = async (isActivated: any) => {
        const state = isActivated ? 1 : 0;
        await fetchRemoteUrl("/rov_control_api/mower?state=" + state);
    }
}