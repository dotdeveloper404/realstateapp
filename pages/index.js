import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Flex,Box,Text,Button } from "@chakra-ui/react";
import { baseUrl,fetchApi } from "@/utils/fetchApi";
import Property from "@/components/Property";

const Banner = ({purpose,imageUrl,title1,title2,desc1,desc2,buttonText,linkName }) => (
  
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10"> 
     <Image alt="banner" src={imageUrl} width={500} height={300} />
     <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text color="3xl" fontSize="bold" fontWeight="medium">{title1} <br></br> {title2}</Text>
      <Text color="gray.700" paddingTop="3" fontSize="lg" fontWeight="medium">{desc1} <br></br> {desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
     </Box>
    </Flex>
);


export default function Home({propertiesForSale,propertiesForRent}) {
  console.log(propertiesForSale)
  console.log(propertiesForRent)
  return(
    <Box>
        <Banner purpose={'For Sale'}
          title1={"Rental Homes for"}
          title2={"Everyone"}
          desc1={"Explore Aparatments,Villas,Homes"}
          desc2={"and more"}
          buttonText={"Explore Renting"}
          linkName={"/search?purpose=for-rent"}
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
        <Flex flexWrap="wrap">
          {propertiesForRent.map((property,i)=> <Property property={property} key={i}/>)}
        </Flex>
      <Banner purpose={'Buy a Home'}
          title1={"Find Buy & Own Your"}
          title2={"Dream Home"}
          desc1={"Explore Aparatments,Villas,Homes"}
          desc2={"and more"}
          buttonText={"Explore Buying"}
          linkName={"/search?purpose=for-sale"}
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
           <Flex flexWrap="wrap">
          {propertiesForSale.map((property,i)=> <Property property={property} key={i}/>)}
        </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=10`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=10`
  );
  console.log(propertyForSale)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
