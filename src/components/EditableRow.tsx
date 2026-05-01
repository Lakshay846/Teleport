import { useState, useEffect } from "react";
import {
  Box,
  Switch,
  TextField,
  CircularProgress,
  Chip,
  Checkbox,
  Typography,
} from "@mui/material";
import { days as dayMap } from "../utils/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/material";

export default function EditableRow({ index, style, data }) {
  const flight = data.flights[index];
  const setFlights = data.setFlights;

  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(flight);

  useEffect(() => {
    setDraft(flight);
  }, [flight]);

  const editing = data.editingRowId === flight.id;
  const setEditingRowId = data.setEditingRowId;

  const { selectedIds, setSelectedIds } = data;
  const isSelected = selectedIds.includes(flight.id);

  const save = async () => {
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 500));

      setFlights((prev) => prev.map((f) => (f.id === draft.id ? draft : f)));

      setEditingRowId(null);
    } catch {
      setDraft(flight);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setDraft(flight);
    setEditingRowId(null);
  };

  const handleDelete = () => {
    setFlights((prev) => prev.filter((f) => f.id !== flight.id));
  };

  return (
    <Box
      style={style}
      sx={{
        display: "grid",
        gridTemplateColumns:
          "40px 90px 70px 90px 120px 70px 70px 210px 120px 170px 130px 100px",
        alignItems: "center",
        px: 2,
        borderBottom: "1px solid #f1f5f9",
        fontSize: 13,
        backgroundColor: editing ? "#f8fafc" : "#fff",
        borderLeft: editing ? "3px solid #2563eb" : "3px solid transparent",
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Checkbox
        sx={{ padding: 0 }}
        checked={isSelected}
        onChange={() => {
          setSelectedIds((prev: string[]) =>
            prev.includes(flight.id)
              ? prev.filter((id) => id !== flight.id)
              : [...prev, flight.id]
          );
        }}
      />
      <div>{flight.id}</div>
      <div>{flight.aoc}</div>
      <div>{flight.flightNumber}</div>
      <div>
        {flight.origin} → {flight.destination}
      </div>

      {/* STD editable */}
      <div>
        {editing ? (
          <TextField
            size="small"
            value={draft.std}
            onChange={(e) => setDraft({ ...draft, std: e.target.value })}
            sx={{
              width: 60,
              "& .MuiInputBase-root": {
                height: 25,
                fontSize: 12,
              },
            }}
          />
        ) : (
          flight.std
        )}
      </div>

      {/* STA editable */}
      <div>
        {editing ? (
          <TextField
            size="small"
            value={draft.sta}
            onChange={(e) => setDraft({ ...draft, sta: e.target.value })}
            sx={{
              width: 60,
              "& .MuiInputBase-root": {
                height: 25,
                fontSize: 12,
                px: 0,
                py: 0,
              },
            }}
          />
        ) : (
          flight.sta
        )}
      </div>

      <div>
        {flight.daysOfOperation
          .map((day: number) => dayMap[day - 1])
          .join(", ")}
      </div>

      <div>
        <Chip label={flight.bodyType} size="small" variant="outlined" />
      </div>

      {/* Date range editable */}
      <div>
        {editing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              size="small"
              type="date"
              value={draft.startDate}
              onChange={(e) =>
                setDraft({ ...draft, startDate: e.target.value })
              }
              sx={{
                width: 135,
                "& .MuiInputBase-root": {
                  height: 25,
                  fontSize: 12,
                },
              }}
            />
            <TextField
              size="small"
              type="date"
              value={draft.endDate}
              onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
              sx={{
                width: 135,
                "& .MuiInputBase-root": {
                  height: 25,
                  fontSize: 12,
                },
              }}
            />
          </Box>
        ) : (
          `${flight.startDate} - ${flight.endDate}`
        )}
      </div>

      {/* Status */}
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Switch
            checked={draft.status === "Active"}
            onChange={() =>
              setDraft({
                ...draft,
                status: draft.status === "Active" ? "Inactive" : "Active",
              })
            }
            size="small"
          />

          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: draft.status === "Active" ? "#16a34a" : "#64748b",
            }}
          >
            {draft.status}
          </Typography>
        </Box>
      </div>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {loading ? (
          <CircularProgress size={20} />
        ) : editing ? (
          <>
            <Tooltip title="Save">
              <IconButton size="small" onClick={save}>
                <SaveIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel">
              <IconButton size="small" onClick={cancelEdit}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => setEditingRowId(flight.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Box>
  );
}
