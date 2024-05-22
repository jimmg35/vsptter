import Ptt from 'ptt-client';
import stateManager from '../states';
import { ServerConnectionStatus } from '../states/types/credential';

const initPttClient = async (): Promise<Ptt | undefined> => {
  console.log('attempting to connect to ptt server');
  return new Promise((resolve) => {
    const ptt = new Ptt();
    ptt.once('connect', () => {
      console.log('ptt client connected');
      resolve(ptt);
    });
    ptt.once('error', () => {
      console.log('ptt client connect timeout ');
      resolve(undefined);
    });
  });
};

const connect2Ptt = async ({
  stateManager,
}: {
  stateManager: stateManager;
}): Promise<Ptt | undefined> => {
  stateManager.init();
  return new Promise(async (resolve) => {
    const pttClient = await initPttClient();
    if (!pttClient) {
      stateManager.setState<ServerConnectionStatus>(
        'serverConnectionStatus',
        'failed',
      );
      resolve(undefined);
      return;
    }
    stateManager.setState<ServerConnectionStatus>(
      'serverConnectionStatus',
      'success',
    );
    resolve(pttClient);
  });
};

export default connect2Ptt;
