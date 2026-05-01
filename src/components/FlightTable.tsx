import React, { useState } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import EditableRow from "./EditableRow";
import type { Flight } from "../types/flight";

interface Props {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

export default function FlightTable({ flights, setFlights }: Props) {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          disabled={selectedIds.length === 0}
          onClick={() => {
            setFlights((prev) =>
              prev.filter((flight) => !selectedIds.includes(flight.id))
            );
            setSelectedIds([]);
          }}
        >
          Delete Selected ({selectedIds.length})
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "40px 90px 70px 90px 120px 70px 70px 210px 120px 170px 130px 100px",
          alignItems: "center",
          fontWeight: 600,
          p: 2,
          borderBottom: "1px solid #ddd",
          backgroundColor: "#f5f5f5",
          fontSize: 14,
          overflowX: "hidden",
        }}
      >
        <Checkbox
          sx={{ padding: 0 }}
          checked={flights.length > 0 && selectedIds.length === flights.length}
          indeterminate={
            selectedIds.length > 0 && selectedIds.length < flights.length
          }
          onChange={(e) =>
            setSelectedIds(e.target.checked ? flights.map((f) => f.id) : [])
          }
        />
        <div>Flight ID</div>
        <div>AOC</div>
        <div>Flight No.</div>
        <div>Route</div>
        <div>STD</div>
        <div>STA</div>
        <div>Days</div>
        <div>Type</div>
        <div>Date Range</div>
        <div>Status</div>
        <div>Actions</div>
      </Box>

      {/* Virtualized rows */}
      <List
        height={600}
        itemCount={flights.length}
        itemSize={70}
        width="100%"
        itemData={{
          flights,
          setFlights,
          editingRowId,
          setEditingRowId,
          selectedIds,
          setSelectedIds,
        }}
        itemKey={(index, data) => data.flights[index].id}
        style={{
          overflowX: "hidden",
        }}
      >
        {EditableRow}
      </List>
    </Box>
  );
}
