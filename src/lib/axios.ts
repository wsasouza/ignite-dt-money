import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://my-json-server.typicode.com/wsasouza/ignite-dt-money',
  baseURL: 'http://localhost:3000',
})
