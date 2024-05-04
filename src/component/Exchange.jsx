import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { server } from "../index";
import { useState } from "react";
import { Container } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import { HStack, VStack, Heading, Text, Image } from "@chakra-ui/react";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);

  const fetchExchanges = async () => {
    try {
      const options = {
        method: "GET",
        url: `${server}/exchanges`,
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-EZeCMKa82PfeMJzpp7uiTkoG	",
        },
      };

      const { data } = await axios.request(options);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

if (error) {
  return <Error message={'error while fetching exchanges'}/>
}

  return (
    <Container maxW={"contsiner.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {exchanges.map((i) => (
              <div>
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              </div>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({  name, img, rank, url }) => (
  <a href={url} target="blank">
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{ "&:hover": { transform: "scale(1.1)" } }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt="exchange"
      ></Image>
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      
    </VStack>
  </a>
);

export default Exchange;
