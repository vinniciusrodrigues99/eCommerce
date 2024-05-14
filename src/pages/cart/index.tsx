import { useContext } from "react" // Importando o hook  useContext
import { CartContext } from "../../components/contexts/CartContext" 
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function Cart() {
  const {cart} = useContext(CartContext)
  const {removeItemCarrinho} = useContext(CartContext)
  const {adicionarItemCarrinho} = useContext(CartContext)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((call, item) => call + (item.amount*item.price), 0) // Calculando o total do carrinho
    return setTotal(total);
  }, [])

  function alertaErro() {
    alert("Erro!")
  }

  return (
    <div className="w-full max-w-7x1 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4"> Meu carrinho </h1>
      {
        cart.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center"> Seu carrinho está vazio </p>
            <Link to="/" className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"> Acessar produtos </Link>
          </div>
        )
      }
      {
        cart.map((itemCarrinho) => (
          <section className="flex items-center justify-between border-b-2 border-gray-300 mr-2" key={itemCarrinho.id}>
            <img
              src={itemCarrinho.cover}
              alt={itemCarrinho.title}
              className="w-28"
              onClick={() => alertaErro()}/>

              <strong className="text-center"> {itemCarrinho.price.toLocaleString("pt-BR", {
                currency: "BRL", 
                style: "currency"
              })} </strong>

              <div className="flex items-center justify-center gap-3">
                <button 
                className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                onClick={()=> removeItemCarrinho(itemCarrinho)}> 
                  -
                </button>

                {itemCarrinho.amount}

                <button 
                className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                onClick={()=> adicionarItemCarrinho(itemCarrinho)}>
                  +
                </button>
              </div> 
              <strong className="float-right mr-2">
                {itemCarrinho.total.toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency"
                })}
              </strong>
          </section>
        ))
      }
      <p className="font-bold mt-4 ml-3"> Total: {total.toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency"
      })} </p>
    </div>
  )
}