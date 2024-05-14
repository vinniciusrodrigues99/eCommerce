import { createContext, ReactNode, useState } from "react";
import {ProductProps} from "../../pages/home";


interface CartContextData {
  cart: CartProps[]; // Lista de produtos no carrinho
  cartAmount: number; // Quantidade de itens no carrinho
  adicionarItemCarrinho: (novoProduto: ProductProps) => void; // Função que recebe um novo produto e não retorna nada
  removeItemCarrinho: (produto: CartProps) => void;
}

export interface CartProps { // Interface do carrinho
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number; // Quantidade de itens
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData); // Criando o contexto

function CartProvider({children} : CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]); // Criando o estado cart

  function adicionarItemCarrinho(novoProduto: ProductProps) {
    //Adiciona no carrinho e verifica se já existe
    const indexItem = cart.findIndex(item => item.id === novoProduto.id); // Verifica se o item já existe no carrinho, caso exista, retorna o índice do item, caso contrário, retorna -1
    //Atualiza o carrinho
    if(indexItem !== -1){
      const newCart = cart.map(item => item.id === novoProduto.id ? { // Mapeia o carrinho e verifica se o item já existe, caso exista, atualiza o item, caso contrário, retorna o item
        ...item, // Retorna o item
        amount: item.amount + 1, // Adiciona mais um item
        total: item.total + novoProduto.price // Atualiza o total
      }: item);

      const gerandoErro = newCart.find(item => item.id === novoProduto.id);
      if (gerandoErro && gerandoErro.amount >= 4) {
        alert("Erro!")
        throw new Error("Boa! Não é possível adicionar mais que três produtos no carrinho");
      }

      setCart(newCart);
      return;
    }
    //Adiciona no carrinho
    const data = {
      ...novoProduto,
      amount: 1,
      total: novoProduto.price
    }
    setCart([...cart, data])
  }
  function removeItemCarrinho(produto: CartProps) {

    const indexItem = cart.findIndex(item => item.id === produto.id); // Verifica se o item já existe no carrinho, caso exista, retorna o índice do item, caso contrário, retorna -1
    if (cart[indexItem]?.amount == 1) {
      const removeItem = cart.filter(item => item.id !== produto.id) // Filtra o item que será removido
      setCart(removeItem);
    }

    if (cart[indexItem]?.amount > 1) { // Verifica se o item já existe no carrinho, caso exista, retorna o índice do item, caso contrário, retorna -1
      const removeItemUnico = cart.map(item => item.id === produto.id ? {
        ...item,
        amount: item.amount -1,
        total: item.total - item.price
      }: item);
      setCart(removeItemUnico);
      return;
    }

  }

  return(
    <CartContext.Provider 
    value={{ 
      cart, 
      cartAmount: cart.length,
      adicionarItemCarrinho, removeItemCarrinho 
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;