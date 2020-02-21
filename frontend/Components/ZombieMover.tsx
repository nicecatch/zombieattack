import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  makeStyles,
  Button,
  Paper
} from "@material-ui/core";
import { IPlainLocation } from "../../generic/interfaces";
import { useMutation } from "@apollo/react-hooks";
import { MOVE_ZOMBIES } from "../graphql/mutations";
import { ILocationResponse } from "../graphql/queries";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ZombieMover: React.FC<{ locations: IPlainLocation[] }> = props => {
  const [from, setFrom] = useState<string>("");

  const [toLocations, setToLocations] = useState<IPlainLocation[]>(
    props.locations
  );
  const [to, setTo] = useState<string>("");

  const [amount, setAmount] = useState<number>(0);

  const classes = useStyles();

  const resetFilters = () => {
    setFrom("");
    setTo("");
    setAmount(0);
  };

  useEffect(() => {
    setToLocations(props.locations.filter(l => l._id !== from));
  }, [from]);

  useEffect(() => {
    const loc = props.locations.find(l => l._id === from);
    if (!loc) {
      setAmount(0);
    } else {
      setAmount(Math.min(loc.zombiesCount, amount));
    }
  }, [from]);

  const [moveZombies, { data, loading, error }] = useMutation<
    ILocationResponse
  >(MOVE_ZOMBIES);

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      direction="column"
    >
      <h2>Move Zombies</h2>
      <Grid container justify="center" alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel>From</InputLabel>
          <Select
            value={from}
            onChange={event => setFrom(event.target.value as string)}
          >
            {props.locations.map(location => (
              <MenuItem
                key={location._id}
                value={location._id}
                disabled={location.zombiesCount === 0}
              >
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>To</InputLabel>
          <Select
            value={to}
            onChange={event => setTo(event.target.value as string)}
            disabled={props.locations.length === toLocations.length}
          >
            {toLocations.map(location => (
              <MenuItem key={location._id} value={location._id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          inputProps={{
            min: "0",
            max: props.locations.find(l => l._id === from)?.zombiesCount,
            step: "1"
          }}
          disabled={from === ""}
          value={amount}
          onChange={event =>
            setAmount(
              Math.min(
                parseInt(event.target.value),
                props.locations.find(l => l._id === from)?.zombiesCount || 0
              )
            )
          }
          label="Count"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          style={{ marginRight: 10 }}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={!from || !to || !amount || loading}
          style={{ marginTop: 16 }}
          onClick={async () => {
            await moveZombies({ variables: { from, to, amount } });
            resetFilters();
          }}
        >
          Move Zombie{amount > 1 ? "s" : ""}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ZombieMover;
