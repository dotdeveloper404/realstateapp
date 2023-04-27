const {
  Menu,
  List,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
  MenuList,
  Link, 
  MenuButton,
} = require("@chakra-ui/react");
import { BsSearch } from "react-icons/bs";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { FiKey } from "react-icons/fi";

const NavBar = () => {
  return (
    <>
      <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize={"3xl"} color={"blue.400"} fontWeight={"bold"}>
          <Link href="/" paddingLeft="2">
            React Real State App
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant="outlined"
              color="red.400"
            />
            <MenuList>
              <Link>
                <MenuItem icon={<FcHome/>}>Home</MenuItem>
              </Link>
              <Link href="/search" >
                <MenuItem icon={<BsSearch/>}>Search</MenuItem>
              </Link>
              <Link href="/search?purpose=for-sale" >
                <MenuItem icon={<FcAbout/>}>Buy Property</MenuItem>
              </Link>
              <Link href="/search?purpose=for-rent" >
                <MenuItem icon={<FiKey/>}>Sale Property</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default NavBar;
