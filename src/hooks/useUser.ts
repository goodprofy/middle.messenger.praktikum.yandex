import { client } from '../client';

export function useUser() {
  return client.getCurrentUser;
}
