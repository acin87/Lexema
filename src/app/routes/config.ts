// const ROUTE_CONFIG_USER_LOGIN = 'login';
const ROUTE_CONFIG_DIALOGIE_ID = 'dialogieId';

export enum AppRoute {
    HOME = 'home',
    AUTH = 'auth',
    USER = 'user',
    FRIENDS = 'friends',
    SETTINGS = 'settings',
    SEARCH = 'search',
    ABOUT = 'about',
    DIALOGUE = 'dialogue',
    DIALOGUES = 'dialogues',
    NOT_FOUND = 'not_found',
}

export const SiteAppRoutePath: Record<AppRoute, string> = {
    [AppRoute.HOME]: '/',
    [AppRoute.AUTH]: '/auth',
    [AppRoute.USER]: '/user/:id',
    [AppRoute.FRIENDS]: '/friends',
    [AppRoute.SETTINGS]: '/settings',
    [AppRoute.SEARCH]: '/search',
    [AppRoute.ABOUT]: '/about',
    [AppRoute.DIALOGUE]: `/dialogue/:${ROUTE_CONFIG_DIALOGIE_ID}`,
    [AppRoute.DIALOGUES]: '/dialogues',
    [AppRoute.NOT_FOUND]: '*',
};
