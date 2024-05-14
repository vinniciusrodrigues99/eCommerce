import { useState, useEffect, useContext } from "react"
import { BsCartPlus } from "react-icons/bs"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"
import { CartContext } from '../../components/contexts/CartContext';
import toast from "react-hot-toast";

export interface ProductProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home(){
  const { adicionarItemCarrinho } = useContext(CartContext);
  const [products, setProducts] = useState<ProductProps[]>([]) // Estou passando o tipo do estado products que é uma lista de objetos
  const navigate = useNavigate(); // Hook de navegação
  useEffect(() => { 
    async function getProducts() { //Quando a página for carregada, a função getProducts é chamada
      const response = await api.get('/products'); //Quando a Promise for resolvida, a resposta é armazenada na variável response // a função get é chamada para buscar os produtos do endpoint /products
      console.log(response.data);
      setProducts(response.data); //O estado products é atualizado com a resposta da API
    }
    getProducts()
  }, []) //O array vazio indica que a função será executada apenas uma vez

  function handleAddCardItem(novoProduto: ProductProps){
    toast.success("Produto adicionado ao carrinho"); // Exibe um toast de sucesso
    adicionarItemCarrinho(novoProduto);
    console.log(novoProduto);
  } 

  function handleImageClick(id: number) {
    console.log(`Clicou na imagem do produto com id ${id}`);
    navigate(`/products/${id}`);
  }


  return (
    <>
      <main className="w-full max-w-7x1 px-4 mx-auto">
      <h1 className="font-bold text-2xl mb-4 mt-10 text-center"> Produtos em alta </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 mb-4">
          {products.map( (product ) => (
            <section key={product.id} className="w-full">
            <img className="w-full rounded-lg max-h-70 mb-2" 
              src={product.cover}
              alt={product.title} 
              onClick={() => handleImageClick(product.id)}/>
              <p className="font-medium mt-1 mb-2"> {product.title} </p>
              <div className="flex gap-3 items-center"> 
                <strong className="text-zinc-700/90"> {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })} </strong>
                <button className="bg-zinc-900 p-1 rounded" onClick={ ()=> handleAddCardItem(product)}>
                  <BsCartPlus size={20} color="#FFF"/>
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}