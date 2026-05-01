import { useEffect, useMemo, useState } from "react";
import flightsData from "./data/flights.json";
import type { Flight } from "./types/flight";
import FlightTable from "./components/FlightTable";
import Filters from "./components/Filters";
import { Box, Typography, Paper, Icon } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    aoc: "",
    bodyType: "",
    days: [] as number[],
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    setFlights(flightsData.flights);
  }, []);

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesSearch =
        flight.flightNumber.includes(search) ||
        flight.origin.toLowerCase().includes(search.toLowerCase()) ||
        flight.destination.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        !filters.status ||
        flight.status.toLowerCase() === filters.status.toLowerCase();

      const matchesAoc = !filters.aoc || flight.aoc === filters.aoc;

      const matchesBody =
        !filters.bodyType || flight.bodyType === filters.bodyType;

      const matchesDays =
        filters.days.length === 0 ||
        flight.daysOfOperation.some((day) => filters.days.includes(day));

      const matchesDate =
        (!filters.fromDate || flight.endDate >= filters.fromDate) &&
        (!filters.toDate || flight.startDate <= filters.toDate);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAoc &&
        matchesBody &&
        matchesDays &&
        matchesDate
      );
    });
  }, [flights, search, filters]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        p: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              mb: 0.5,
            }}
          >
            Flight Schedule Manager
            <Icon sx={{ ml: 1, color: "#3b82f6", verticalAlign: "middle" }}>
              <AirplanemodeActiveIcon />
            </Icon>
          </Typography>
  
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
            }}
          >
            Manage flight schedules, operational dates, filters, and status updates
          </Typography>
        </Box>
  
        {/* Main content */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Filters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
          />
  
          <FlightTable
            flights={filteredFlights}
            setFlights={setFlights}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
