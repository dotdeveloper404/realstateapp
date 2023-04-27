import SearchFilters from "@/components/SearchFilters";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import { noResult } from "/assets/images/noresult.svg";
import Image from "next/image";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Property from "@/components/Property";
const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false); //at start it should be false
  const router = useRouter();

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
        cursor={"pointer"}
        bg="gray.100"
        borderBottom={"1px"}
        borderColor={"blue.200"}
        fontWeight={"black"}
        fontSize={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft={"2"} w={"7"} as={BsFilter}></Icon>
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize={"2xl"} fontWeight={"bold"} padding={"4"}>
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property key={property.internalID} property={property} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          marginTop="5"
          marginBottom={"5"}
        >
          <Image src={noResult} alt="no result" />
          <Text fontSize={"2xl"}>No Result Found :( </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = (query.rentFrequency = "yearly");
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
