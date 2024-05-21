import Ptt from "ptt-client/dist";

class CredentialService {
  constructor(pttClient: Ptt) {}

  authenticate(username: string, password: string) {
    console.log(`authenticating with ${username} and ${password}`);
  }
}

export default CredentialService;
