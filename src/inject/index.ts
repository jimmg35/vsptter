import 'reflect-metadata';
import { container } from 'tsyringe';
import CredentialService from '../services/credential.service';
import StatusService from '../services/status.service';

const inject2Services = () => {
  container.registerSingleton(CredentialService);
  container.registerSingleton(StatusService);
  const credentialService = container.resolve(CredentialService);
  const statusService = container.resolve(StatusService);
  // const credentialService = container.resolve(CredentialService);
  // const statusService = container.resolve(StatusService);
  // container.register('credentialService', { useValue: credentialService });
  // container.register('statusService', { useValue: statusService });
  // return { credentialService, statusService };
};

export default inject2Services;
