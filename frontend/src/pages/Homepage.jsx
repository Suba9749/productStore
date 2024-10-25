
import { Container, VStack ,Text, SimpleGrid} from '@chakra-ui/react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';


const Homepage=()=> {
 
  const {fetchProduct,products}=useProductStore();

  useEffect(()=>{
    fetchProduct();
  },[fetchProduct]);
  console.log(products);

  return (
    <Container maxW={'container.xl'} py={12}>
   <VStack>
    <Text fontSize={"30"}
    fontWeight={"bold"}
    bgGradient={"linear(to-r,cyan.400,blue.500)"}
    bgClip={"text"}
    textAlign={"certer"}>
      Current Products
    </Text>

<SimpleGrid column={{base: 1,
						md: 2,
						lg: 3}}
spacing={10} w={'full'}>
{products.map((product)=>(
  <ProductCard key={product._id} product={product}/>
))}
</SimpleGrid>

{products.length===0 &&(
    <Text fontSize="x1" textAlign={"center"} color={"gray.500"}>
    No Products Found 👾{" "}
  <Link to={"/create"}>
    <Text color={"blue.500"} _hover={{textDecoration: "underline"}} cursor={"pointer"}>
     Create a product
    </Text>
    </Link>
   </Text>
)}
  

   </VStack>
</Container>
  )
};

export default Homepage;
