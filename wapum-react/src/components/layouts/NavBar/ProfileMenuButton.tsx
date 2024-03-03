import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";
import { getMediaUrl } from "../../../utils/urlParser";

export const ProfileMenuButton = () => {
  const { logout, user } = useAuthStore();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={getMediaUrl(user?.avatar || "")} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar size={"2xl"} src={getMediaUrl(user?.avatar || "")} />
        </Center>
        <br />
        <Center>{user && <p>{user.username}</p>}</Center>
        <br />
        <MenuDivider />
        <MenuItem as={NavLink} to={"/private/profile"}>
          {"Account Settings"}
        </MenuItem>
        <MenuItem as={NavLink} to={"/private/create-ad"}>
          {"Create Ad"}
        </MenuItem>
        <MenuItem onClick={logout}>{"Logout"}</MenuItem>
      </MenuList>
    </Menu>
  );
};
