import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TransactionsHistory } from "./TransactionsHistory";
import UserProfileEdit from "./UserEditProfile";

export const Profile = () => {
  return (
    <>
      <Tabs w={"100%"}>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TabList
            bg={useColorModeValue("gray.100", "gray.900")}
            h={"70px"}
            justifyContent={"center"}
          >
            <Tab>User Edit Profile</Tab>
            <Tab>Transactions History</Tab>
          </TabList>
        </motion.div>

        <TabPanels>
          <TabPanel>
            <UserProfileEdit />
          </TabPanel>
          <TabPanel>
            <TransactionsHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
