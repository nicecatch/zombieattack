import React from "react";
import { Box as MBox, Grid, Paper } from "@material-ui/core";

interface IProps {
  height?: string | number;
  textAlign?: "center";
}

const Box: React.FC<IProps> = props => {
  const { height, textAlign } = props;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: height ?? "100%", textAlign: textAlign }}
    >
      <Paper>
        <MBox p={3}>{props.children}</MBox>
      </Paper>
    </Grid>
  );
};

export default Box;
