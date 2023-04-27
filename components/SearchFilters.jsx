import { Box, Flex, Select, Text, filter } from "@chakra-ui/react";
import { useState } from "react";
import { filterData, getFilterValues } from "@/utils/filterData";
import { useRouter } from "next/router";

const SearchFilters = () => {
    const router = useRouter();
    
  const [filters, setFilters] = useState(filterData); //filterData is for filters paramters query
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item)=>{
        query[item.name] = item.value;
    })
    router.push({pathname:path,query});
  };
  return (
    <>
      <Flex bg="gray.100" p="4" justifyContent="center" flex="wrap">
        {filters.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              placeholder={filter.placeholder}
              width="fit-content"
              p="2"
              onChange={
                (e) => searchProperties({ [filter.queryName]: e.target.value }) //array is for  specific/one  whether it for price ,name anything
              }
            >
              {filter?.items?.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default SearchFilters;
