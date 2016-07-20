import axios from "axios";
export const fetchData = () => {
    return {
        type: 'FECTH_USER',
        payload: axios.get('http://api.ceair.com/EB.TUZKI.UI.Web.Pc/api/Product/SearchProductListByKey', {
            params: {
                key: 'dynamic_0a3353ef489adbcae9d58d9fe07e3548_2_0'
            }
        })
    }
};
