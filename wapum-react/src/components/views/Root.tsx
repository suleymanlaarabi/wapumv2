import { Outlet } from "react-router-dom";
import { PageContainer } from "../container/PageContainer";
import NavBar from "../layouts/NavBar/NavBar";

export const Root = () => {
  return (
    <>
      <NavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};
