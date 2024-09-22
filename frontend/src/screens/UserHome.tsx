import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import citiesFile from "../../../cities.json";
import Loader from "../components/Loader";
import CitySearchInput from "../components/CitySearch";
import StartDatePicker from "../components/StartDatePicker";
import EndDatePicker from "../components/EndDatePicker";
import Footer from "../components/Footer";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

function UserHome() {
  const [cities, setCities] = useState([]);
  const [filteredCities1, setFilteredCities1] = useState([]);
  const [filteredCities2, setFilteredCities2] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState(
    "Schiphol Zuid, Schiphol Airport, Netherlands"
  );
  const [searchQuery2, setSearchQuery2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    city1: "",
    city2: "",
    startDate: "",
    endDate: "",
  });
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = () => {
      const cityData = citiesFile;
      const validCities = cityData.filter(
        (destination) => destination.city && destination.city.trim() !== ""
      );
      setCities(validCities);
      setFilteredCities1(validCities);
      setFilteredCities2(validCities);
      setLoading(false);
    };

    loadCities();
  }, []);

  useEffect(() => {
    const result1 = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery1.toLowerCase())
    );
    setFilteredCities1(result1);
    setCurrentPage(1);
  }, [searchQuery1, cities]);

  useEffect(() => {
    const result2 = cities.filter((city) =>
      city.name.toLowerCase().includes(searchQuery2.toLowerCase())
    );
    setFilteredCities2(result2);
    setCurrentPage(1);
  }, [searchQuery2, cities]);

  useEffect(() => {
    if (selectedCity1 && startDate && selectedCity2) {
      setLoading(true);
      axios
        .get("http://localhost:5001/api/flights", {})
        .then((response) => {
          const fetchedFlights = response.data.flights || [];

          const matchedFlights = fetchedFlights.filter(
            (flight) =>
              flight.scheduleDate === startDate &&
              flight.destinations[0] === selectedCity2.code
          );
          console.log(matchedFlights);

          setFlights(matchedFlights.length > 0 ? matchedFlights : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching flight data:", error);
          setLoading(false);
        });
    }
  }, [selectedCity1, selectedCity2, startDate, endDate]);

  const handleSubmit = () => {
    let hasError = false;
    if (!hasError) {
      const fetchFlights = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/flights`,
            {
              params: { scheduleDate: startDate },
            }
          );

          const flights = response.data.flights || [];
          setLoading(false);

          const matchingFlights = flights.filter((flight) => {
            return (
              flight.scheduleDate === startDate &&
              flight.route.destinations[0] === selectedCity2.code
            );
          });

          setFlights(matchingFlights);
        } catch (error) {
          console.error("Error fetching flight data:", error);
          setLoading(false);
        }
      };

      setLoading(true);
      setError(error);
      fetchFlights();
    }
  };

  const selectFlight = (flight) => {
    navigate("/myflights", { state: { flight } });
  };

  return (
    <>
      <Container className="py-5 bg-light position-relative">
        <h2 className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="me-2"
            style={{ width: "30px", height: "30px" }}>
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
          Book Your Flight
        </h2>

        <Row className="mb-4 flex-row">
          <Col>
            <CitySearchInput
              label="From:"
              searchQuery={searchQuery1}
              setSearchQuery={setSearchQuery1}
              filteredCities={filteredCities1.slice(
                (currentPage - 1) * citiesPerPage,
                currentPage * citiesPerPage
              )}
              onSelectCity={setSelectedCity1}
              error={error.city1}
            />
          </Col>
          <Col>
            <CitySearchInput
              label="To:"
              searchQuery={searchQuery2}
              setSearchQuery={setSearchQuery2}
              filteredCities={filteredCities2.slice(
                (currentPage - 1) * citiesPerPage,
                currentPage * citiesPerPage
              )}
              onSelectCity={setSelectedCity2}
              error={error.city2}
            />
          </Col>

          <Col>
            <StartDatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              error={error.startDate}
            />
          </Col>
          <Col>
            <EndDatePicker
              endDate={endDate}
              setEndDate={setEndDate}
              error={error.endDate}
            />
          </Col>
        </Row>

        <div className="text-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="d-flex w-15 p-2"
            disabled={loading}>
            Show Flights
          </Button>
          {loading && <Loader />}
        </div>

        <div
          className="position-absolute"
          style={{
            top: "50px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "blue",
            }}></div>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "green",
            }}></div>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "red",
            }}></div>
        </div>

        {flights.length > 0 ? (
          <Row className="mt-4 p-2 w-100">
            {flights.map((flight) => (
              <Row md={6} key={flight.id} className="">
                <Card className="mb-3 bg-gradient-dark p-4 w-100">
                  <Card.Body>
                    <Card.Title>
                      Flight Number: {flight.flightNumber}
                    </Card.Title>
                    <Card.Text>
                      <strong>Flight Name:</strong> {flight.flightName}
                      <br />
                      <strong>Departure Time:</strong> {flight.scheduleDate}
                      <br />
                      <strong>Arrival Time:</strong> {flight.actualLandingTime}
                      <br />
                      <strong>Airline:</strong> {flight.prefixICAO}
                      <br />
                      <strong>Terminal:</strong> {flight.route.destinations[0]}
                    </Card.Text>
                    <div className="text-end">
                      <Button
                        variant="primary"
                        onClick={() => selectFlight(flight)}>
                        Book Flight
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            ))}
          </Row>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

export default UserHome;
