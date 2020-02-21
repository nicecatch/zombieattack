import { NextPage } from "next";
import { Header } from "../frontend/Components/Header";
import { Grid, CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_LOCATIONS, ILocationResponse } from "../frontend/graphql/queries";
import ZombiesPanel from "../frontend/Components/ZombiePanel";
import Box from "../frontend/Components/Box";

const Home: NextPage = () => {
  const { data, loading } = useQuery<ILocationResponse>(GET_LOCATIONS);

  return (
    <>
      <Header />
      <Grid container justify="center" alignItems="center">
        <h1>Zombie Manager</h1>
      </Grid>
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {data && data.getLocations && (
        <ZombiesPanel locations={data.getLocations} />
      )}
    </>
  );
};

export default Home;
