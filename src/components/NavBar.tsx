import { HStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <ColorModeSwitch />
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold">
          IT Crowd Challenge
        </Text>
      </Link>

      <Link to="/admin">
        <Button variant="outline" colorScheme="blue">
          Admin
        </Button>
      </Link>
    </HStack>
  );
};

export default NavBar;
