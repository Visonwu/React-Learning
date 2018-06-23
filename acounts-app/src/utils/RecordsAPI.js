import axios from 'axios';
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5b28f9b084ce2c0014d4d0e6.mockapi.io/"

/*从服务器获取原始数据*/
export const getAll = ()=>
    axios.get(`${api}/api/v1/records`);

/*添加一条记录*/
export  const create = (body)=>
    axios.post(`${api}/api/v1/records`,body);

/*更新记录信息*/
export  const update = (id,body)=>
    axios.put(`${api}/api/v1/records/${id}`,body);

/*更新记录信息*/
export  const remove = (id)=>
    axios.delete(`${api}/api/v1/records/${id}`);