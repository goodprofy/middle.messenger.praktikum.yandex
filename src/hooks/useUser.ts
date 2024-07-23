import { User } from '../client';
import { useStore } from './useStore';

export function useUser() {
  const { get } = useStore();
  return get('user') as User;
}
