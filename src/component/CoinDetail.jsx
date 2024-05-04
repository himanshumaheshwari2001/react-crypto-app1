import React from 'react'
import axios from "axios";
import { Container ,Box, RadioGroup, HStack, Radio, VStack, Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button} from '@chakra-ui/react'
import Loader from "./Loader";
import { useEffect ,useState} from "react";
import { useParams } from 'react-router-dom';
import { server } from "../index";
import Error from "./Error";
import Chart from './Chart';


const CoinDetail = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] =useState('inr')
  const [days,setDays] =useState('24h')
  const [chartArray,setChartArray] =useState([])
  const params = useParams()
  const currencySymbol = currency === 'inr' ? '₹' : currency==='eur'?'Є' : "$"; 
  const btns = ['24h' , '7d' , '14d' , '30d' , '60d' , '200d' , '365d' , 'max']

  const switchChartStats = (key) =>{
    switch (key) {
      case '24h':
        setDays('24h')
        setLoading(true)
        
        break;
      case '7d':
        setDays('7d')
        setLoading(true)
        
        break;
        
      case '14d':
        setDays('14d')
        setLoading(true)
        
        break;
      case '30d':
        setDays('30d')
        setLoading(true)
        
        break;    
    

      case '60d':
        setDays('60d')
        setLoading(true)
        break;   
      case '200d':
        setDays('200d')
        setLoading(true)
        break;         
      case '365d':
        setDays('365d')
        setLoading(true) 
        break;   
      case 'max':
        setDays('max')
        setLoading(true)   
         
        break;  
      default:
        setDays('24h')
        setLoading(true)
        break;
    }

  }

  const fetchCoins = async () => {
    try {
      const options = {
        method: "GET",
        url: `${server}/coins/${params.id}`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-EZeCMKa82PfeMJzpp7uiTkoG	",
        },
      };
      const options1 = {
        method: "GET",
        url: `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-EZeCMKa82PfeMJzpp7uiTkoG	",
        },
      };


      const { data } = await axios.request(options);

      //fetching chart data with options1 as all data
      const { data:chartData } = await axios.request(options1);
      // console.log(data);
      setCoin(data);
      setChartArray(chartData.prices)
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false)
      console.log(error);
    }
  };
  // const fetchCoinsData = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       url: `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`,
  //       headers: {
  //         accept: "application/json",
  //         "x-cg-demo-api-key": "CG-EZeCMKa82PfeMJzpp7uiTkoG	",
  //       },
  //     };

  //     const { data:chartData } = await axios.request(options);
  //     // console.log("chartData is ---------",chartData);
  //     setChartArray(chartData.prices)
  //     setLoading(false);
  //   } catch (error) {
  //     setError(true);
  //     setLoading(false)
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchCoins();
    // fetchCoinsData();
  }, [params.id,currency,days]);

if (error) {
  return <Error message={'error while fetching coin'}/>
}



  return (
    <Container maxW={'container.xl'}>
      {
        loading?(<Loader />) : 
        
        (<>
        <Box w={'full'} borderWidth={1} >
<Chart arr={chartArray} currency={currencySymbol} days={days}/>
        </Box>
        <HStack p={'4'} overflowX={'auto'}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={() =>switchChartStats(i)}>
                {i}
              </Button>
            ))
          }

        </HStack>
        <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
          <HStack spacing={'4'}>
            <Radio value="inr">inr</Radio>
            <Radio value="usd">usd</Radio>
            <Radio value="eur">eur</Radio>
            
          </HStack>
        </RadioGroup>
        <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
          <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>
            Last Updated on {Date(coin.market_data.last_updated).split("G")[0]} 

          </Text>
          <Image src={coin.image.large} w={'16'} h={'16'} />
          <Stat>
            <StatLabel>
              {coin.name}
            </StatLabel>
            <StatNumber>
              {currencySymbol}{coin.market_data.current_price[currency]}
            </StatNumber>
            <StatHelpText>
              <StatArrow  type='coin.market_data.price_change_percentage_24h>0?increase:decrease'/>{coin.market_data.price_change_percentage_24h}
            </StatHelpText>
          </Stat>
          <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
            {`#${coin.market_cap_rank}`}
          </Badge>
          <CustomBar 
          high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
          low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
          <Box w={'full'} p='4'>
            <Item title={"max supply"} value={coin.market_data.max_supply}/>
            <Item title={"Circulating supply"} value={coin.market_data.circulating_supply}/>
            <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
            <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
            <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
            

          </Box>
        </VStack>


        </>)
      }

    </Container>
  )
}

const Item = ({title,value}) =>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas neue'} letterSpacing={'widest'}>
      {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
)

const CustomBar = ({high,low}) =>(
  <VStack w={'full'}>
    <Progress  value={50} colorScheme={'teal'} w={'full'}/>
    <HStack w={'full'} justifyContent={'space-between'}>
      <Badge children={low} colorScheme={'red'}/>
      <Text fontSize={'sm'}>24 hour Range</Text>
      <Badge children={high} colorScheme={'green'}/>

    </HStack>

  </VStack>
)


export default CoinDetail
