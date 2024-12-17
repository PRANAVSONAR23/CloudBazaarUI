import ProductCard from "@/components/custom/ProductCard"
import { Link } from "react-router-dom"

const Home = () => {

    const addToCartHandler=()=>{}
  return (
    <div>
        <div className="w-full flex justify-between gap-10 item-center px-40 py-10 ">
            <h1 className="text-2xl font-semibold">Latest Product</h1>
            <Link to={'/search'}>More</Link>
        </div>

        <div className="w-full p-10 flex justify-between items-center flex-wrap gap-4">
            <ProductCard productId={'123'} price={1233} photo="fsf" name="dsdffd" stock={1212} handler={addToCartHandler} />
        </div>
    </div>
  )
}

export default Home