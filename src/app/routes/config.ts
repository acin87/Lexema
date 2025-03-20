// const ROUTE_CONFIG_USER_LOGIN = 'login';
const ROUTE_CONFIG_MESSEGE_ID = 'messegeId';

export const BASE_SITE_URL = 'http:/localhost:5173'

export enum AppRoute {
    HOME = 'home',
    AUTH = 'auth',
    PROFILE = 'profile',
    FRIENDS = 'friends',
    SETTINGS = 'settings',
    SEARCH = 'search',
    ABOUT = 'about',
    MESSEGE = 'message',
    MESSENGER = 'messenger',
    NOT_FOUND = 'not_found',
}

export const SiteAppRoutePath: Record<AppRoute, string> = {
    [AppRoute.HOME]: '/',
    [AppRoute.AUTH]: '/auth',
    [AppRoute.PROFILE]: '/profile/:id',
    [AppRoute.FRIENDS]: '/friends',
    [AppRoute.SETTINGS]: '/settings',
    [AppRoute.SEARCH]: '/search',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.MESSEGE]: `/message/:${ROUTE_CONFIG_MESSEGE_ID}`,
    [AppRoute.MESSENGER]: '/messenger',
    [AppRoute.NOT_FOUND]: '*',
};
