import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading,Text,Image, IconButton, HStack, useColorModeValue, useToast, Modal, useDisclosure, ModalOverlay,ModalContent, ModalHeader, ModalCloseButton, Input, ModalBody, VStack,ModalFooter,Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';


const  ProductCard=({product})=> {

    const [updatedProduct,setupdatedProduct]=useState(product);
    const textColor=useColorModeValue("grey.600","grey.200");
    const bg = useColorModeValue("white", "gray.800");


   const {deleteProduct,updateProduct}= useProductStore();
   const toast=useToast();

   const { isOpen, onOpen, onClose } = useDisclosure();
   
    const handelDeleteProduct=async (pid)=>{
const {success,message}=await deleteProduct(pid);
if(!success){
    toast({
        title:"Error",
        description:message,
        status:"error",
        duration:2000,
        isClosable: true,
    })
}else{
    toast({
        title:"success",
        description:message,
        status:"success",
        duration:2000,
        isClosable:true,
    })
}
    };


    const handelUpdatdProduct=async(pid,updatedProduct)=>{
       
      const {success,message}= await updateProduct(pid,updatedProduct);
        onClose();
        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                duration:2000,
                isClosable:true,
            });
        }else{
            toast({
                title:"success",
                description:"Product Update Sucessfully",
                status:"success",
                duration:2000,
                isClosable:true,
            });
        }
    }

  return (
    <Box
    shadow={"lg"}
    rounded={"lg"} overflow={'hidden'} transition={"all 0.3s"}
    _hover={{transform :"translateY(-5px)", shadow:'xl'}}
    bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit={'cover'}></Image>
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>

            {/* Delete in clint side */}
            <HStack spacing={2}>
					<IconButton icon={<EditIcon />}
                    onClick={onOpen}  colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />} onClick={()=>handelDeleteProduct(product._id)}
						colorScheme='red'
					/>
				</HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            
            <ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
                                value={updatedProduct.name}
								onChange={(e)=>setupdatedProduct({...updatedProduct,name:e.target.value})}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
                                onChange={(e)=>setupdatedProduct({...updatedProduct,price:e.target.value})}
							/>
							<Input
								placeholder='Image URL'
								name='image'
                                value={updatedProduct.image}
                                onChange={(e)=>setupdatedProduct({...updatedProduct,image:e.target.value})}
								
							/>
						</VStack>
					</ModalBody>
                    <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handelUpdatdProduct(product._id,updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
                    </ModalContent>

        </Modal>
        
      
    </Box>

  )
}

export default ProductCard