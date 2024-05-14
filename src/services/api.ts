import axios from 'axios'

export const api = axios.create({ // Criando uma instância do axios que recebe como parâmetro um objeto com a baseURL
  baseURL: 'http://localhost:3000' // URL base da API
});