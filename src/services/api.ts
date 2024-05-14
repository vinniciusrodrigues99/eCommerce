import axios from 'axios'

export const api = axios.create({ // Criando uma instância do axios que recebe como parâmetro um objeto com a baseURL
  baseURL: 'https://banco-json.vercel.app/' // URL base da API
});