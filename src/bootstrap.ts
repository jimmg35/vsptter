// import "./states/index";
import * as vscode from "vscode";
import Ptt from "ptt-client";
import { Article } from "ptt-client/dist/sites/ptt/model";
import stateManager from "./states";
import { ServerConnectionStatus } from "./states/types/credential";

const initPttClient = async (): Promise<Ptt | undefined> => {
  console.log("attempting to connect to ptt server");
  return new Promise((resolve) => {
    const ptt = new Ptt();
    ptt.once("connect", () => {
      console.log("ptt client connected");
      resolve(ptt);
    });
    ptt.once("error", (err) => {
      console.log("ptt client connect timeout");
      resolve(undefined);
    });
  });
};

const bootstrap = async (): Promise<Ptt | undefined> => {
  stateManager.init();
  return new Promise(async (resolve) => {
    const pttClient = await initPttClient();
    if (!pttClient) {
      stateManager.setState<ServerConnectionStatus>(
        "serverConnectionStatus",
        "failed"
      );
      resolve(undefined);
      return;
    }
    stateManager.setState<ServerConnectionStatus>(
      "serverConnectionStatus",
      "success"
    );
    resolve(pttClient);
  });
};

export default bootstrap;
