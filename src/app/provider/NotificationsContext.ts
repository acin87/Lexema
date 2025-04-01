import { createContext } from 'react';
import { Notifications } from '../../features/notifications/types/NotificationsTypes';

export const NotificationsContext = createContext({} as Notifications[] | undefined);