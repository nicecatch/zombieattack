import { IPlainLocation } from "../../generic/interfaces";
import { Grid, Box, Paper, withStyles } from "@material-ui/core";
import ZombieMover from "./ZombieMover";

const ZombiesPanel: React.FC<{ locations: IPlainLocation[] }> = props => {
  return (
    <Grid container justify="space-around" alignItems="center">
      {props.locations.map(location => (
        <Paper key={location._id} style={{ width: 250, height: 250 }}>
          <Box p={3} style={{ textAlign: "center", fontSize: 40 }}>{location.name}</Box>
          <Box p={3} style={{ textAlign: "center", fontSize: 40 }}>
            {location.zombiesCount}
          </Box>
        </Paper>
      ))}
      <ZombieMover locations={props.locations} />
    </Grid>
  );
};

export default ZombiesPanel;
