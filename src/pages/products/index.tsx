import { useState, useEffect } from "react";

import { api } from "../../services/api";
import { ProductProps } from "../../pages/home";
import { CartContext } from "../../components/contexts/CartContext";
import { useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useContext } from "react"; 
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export function Product() {
  const { adicionarItemCarrinho } = useContext(CartContext);
  const [product, setProduct] = useState<ProductProps>();
  const { id } = useParams<{ id: string }>(); // Pegando o id da rota

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    }
    getProduct();
  }, [id])

  function handleAddCardItem(novoProduto: ProductProps) {
    toast.success("Produto adicionado ao carrinho");
    adicionarItemCarrinho(novoProduto);
  }
return(
  <div>
    <section className="flex items-center justify-center mx-auto px-20">
      <div className="w-6/12">       
        <img className="w-10/12 rounded-lg max-h-65 mb-2" 
        src={product?.cover} 
        alt={product?.title} />
      </div>
      <div className="w-6/12">
        <h1 className="font-bold text-3xl mb-2 mt-10 text-center"> {product?.title} </h1>
        <p className="font-normal text-1xl mb-2 mt-5 text-center"> {product?.description} </p>
        <br/>
        <div className="flex gap-3 items-center"> 
          <strong className="text-zinc-700/90"> {product?.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })} </strong>
          <Link className='relative' to={'/cart'}>
            <button className="bg-zinc-900 p-1 rounded" onClick={ ()=> {
              if(product)
                handleAddCardItem(product)
                else
                console.log("Produto indefinido")
            }}>
              <BsCartPlus size={20} color="#FFF"/>
            </button>
          </Link>
        </div>
      </div>
    </section>
  </div>
)
}