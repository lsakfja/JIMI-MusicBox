import axios from "axios";
import { ref } from "vue";

const urlList = {
    local: 'http://localhost:8080',
}
const token = ref('token')

/* 普通请求 */
const plainAxios = axios.create()
/* header中加入token */
const instance = axios.create()

instance.interceptors.request.use(
    config => {
        if (token.value) {
            config.headers['token'] = token.value;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)



export { plainAxios, instance, urlList }