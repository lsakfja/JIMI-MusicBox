let fetch;
let axios
async function loadPack() {
    const module = await import('node-fetch');
    fetch = module.default;  // 直接使用 module.default，确保 fetch 是一个函数

    const axiosModule = await import('axios');
    axios = axiosModule.default;  // 解构出 axios 的默认导出
    
}
loadPack();  // 调用加载函数

import { ipcMain } from 'electron';
export async function urlGetter(){

    /* 查询天气 */
    ipcMain.on('send-url', async (e, url, resBody)=>{
        let result = await getWeather(url, resBody)
        e.sender.send('respone-weather-result', result)
        
    })
}

async function getWeather(url, resBody){
    console.log("load weather data");
    /* try {
        if (!fetch) {
            await loadPack();
        }
        const response = await fetch('https://restapi.amap.com/v3/weather/weatherInfo?key=844e978fda39a87362de979b2dc10e13&city=120106');
        
        if (response.ok) {
            const result = await response.json();
            console.log("Response from server:", result);
        } else {
            console.log("HTTP error:", response.status);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    } */
    if (!axios) {
        await loadPack();  // 如果 axios 未加载，重新加载模块
    }
    return new Promise((resolve, reject)=>{
        try {
            const response = 
                axios.get(url)
                            .then(res=>{
                                //console.log('res is', res.data);
                                resolve(res.data.lives)
                            })
                            .catch(err=>{
    
                            })
            
        } catch (error) {
            console.error("Axios error:", error);
        }
    })
}
