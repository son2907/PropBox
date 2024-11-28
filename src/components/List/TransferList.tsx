import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

interface Item {
  id: string | number;
  label: string;
}

interface TransferProps {
  leftTitle: string;
  rightTitle: string;
  left: Item[];
  right: Item[];
  checked: Item[];
  leftChecked: Item[];
  rightChecked: Item[];
  handleToggle: (value: Item) => () => void;
  handleToggleAll: (items: Item[]) => () => void;
  handleCheckedRight: () => void;
  handleCheckedLeft: () => void;
  handleAllLeft: () => void;
  handleAllRight: () => void;
  numberOfChecked: (items: Item[]) => number;
}

export default function TransferList({
  leftTitle,
  rightTitle,
  left,
  right,
  ...rest
}: TransferProps) {
  const {
    checked,
    leftChecked,
    rightChecked,
    handleToggle,
    handleToggleAll,
    handleCheckedRight,
    handleCheckedLeft,
    handleAllLeft,
    handleAllRight,
    numberOfChecked,
  } = rest;

  const customList = (title: React.ReactNode, items: Item[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1, backgroundColor: "lightgray" }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        // subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((item: Item) => {
          const labelId = `transfer-list-all-item-${item.id}-label`;

          return (
            <ListItemButton
              key={item.id}
              role="listitem"
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(item)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid item>{customList(leftTitle, left)}</Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(rightTitle, right)}</Grid>
    </Grid>
  );
}
