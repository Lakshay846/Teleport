import { daysMap as days } from "../utils/constants";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";

export default function Filters({ search, setSearch, filters, setFilters }) {
  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: 700,
          color: "#334155",
          fontSize: 14,
        }}
      >
        Filters
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "1.4fr 1fr 1fr 1fr 0.8fr 1fr 1fr auto",
          },
          gap: 2,
          mb: 8,
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />

        <TextField
          label="From"
          size="small"
          type="date"
          value={filters.fromDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              fromDate: e.target.value,
            })
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="To"
          type="date"
          size="small"
          value={filters.toDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              toDate: e.target.value,
            })
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: "100%" }}>
          <InputLabel>Status</InputLabel>
          <Select
            size="small"
            value={filters.status}
            label="Status"
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "100%" }}>
          <InputLabel>AOC</InputLabel>
          <Select
            size="small"
            value={filters.aoc}
            label="AOC"
            onChange={(e) =>
              setFilters({
                ...filters,
                aoc: e.target.value,
              })
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="AK">AK</MenuItem>
            <MenuItem value="D7">D7</MenuItem>
            <MenuItem value="QZ">QZ</MenuItem>
            <MenuItem value="FD">FD</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "100%" }}>
          <InputLabel>Body Type</InputLabel>
          <Select
            size="small"
            value={filters.bodyType}
            label="Body Type"
            onChange={(e) =>
              setFilters({
                ...filters,
                bodyType: e.target.value,
              })
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="narrow body">narrow body</MenuItem>
            <MenuItem value="wide body">wide body</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "100%" }}>
          <InputLabel>Days</InputLabel>
          <Select
            multiple
            size="small"
            value={filters.days}
            input={<OutlinedInput label="Days" />}
            renderValue={(selected) =>
              days
                .filter((day) => selected.includes(day.value))
                .map((day) => day.label)
                .join(", ")
            }
            onChange={(e) =>
              setFilters({
                ...filters,
                days: e.target.value as number[],
              })
            }
          >
            {days.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                <Checkbox checked={filters.days.includes(day.value)} />
                <ListItemText primary={day.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setFilters({
              fromDate: "",
              toDate: "",
              days: [],
              status: "",
              aoc: "",
              bodyType: "",
            });
          }}
        >
          Clear All
        </Button>
      </Box>
    </>
  );
}
