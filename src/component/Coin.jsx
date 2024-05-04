import React from "react";
import axios from "axios";
import { useEffect ,useState} from "react";
import { server } from "../index";
import { Button, Container ,HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCarrd";

const Coin = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] =useState('inr')

  const currencySymbol = currency === 'inr' ? '₹' : currency==='eur'?'Є' : "$"; 

  const fetchCoins = async () => {
    try {
      const options = {
        method: "GET",
        url: `${server}/coins/markets?vs_currency=${currency}&page=${page}`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-EZeCMKa82PfeMJzpp7uiTkoG	",
        },
      };

      const { data } = await axios.request(options);
      console.log(data);
      setCoin(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false)
      console.log(error);
    }
  };

  const changePage = (page)=>{
    setPage(page)
    setLoading(true)

  }

  const btns = new Array(132).fill(1)


  useEffect(() => {
    fetchCoins();
  }, [currency,page]);

if (error) {
  return <Error message={'error while fetching coins'}/>
}

  return (
    <Container maxW={"contsiner.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* const currencySymbol = currency === 'inr' ? '₹' : currency==='eur'?'Є' : "$";  */}
        <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
          <HStack spacing={'4'}>
            <Radio value="inr">inr</Radio>
            <Radio value="usd">usd</Radio>
            <Radio value="eur">eur</Radio>
            
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coin.map((i) => (
              
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              
            ))}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={'8'}>

          {
            btns.map((item,index)=>(
              <Button key={index} bgColor={"blackAlpha.900"} color={'white'} onClick={()=>changePage(index+1)}>
              {index+1}
            </Button>
            ))
           }
            
          </HStack>
        </>
      )}
    </Container>
  );
};



export default Coin;
