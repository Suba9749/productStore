import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";



function App() {
 

  return (
    <Box minH={"100vh"} bg={useColorModeValue("grey.100","grey.900")}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
       <Route path="/create"element={<CreatePage/>}></Route>
      </Routes>
   
    </Box>
  )
}

export default App;
