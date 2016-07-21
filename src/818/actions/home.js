import { get } from '../../common/ceFetch';

export const HOME_LOAD = 'HOME_LOAD';

export const homeLoad = () => {
    return {
        type: HOME_LOAD,
        payload: get('http://10.0.10.125:8099/api/UserInfo/GetUserInfo')
    }
};
