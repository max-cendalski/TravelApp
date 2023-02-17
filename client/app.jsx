import React from "react";
import decodeToken from "./lib/decode-token.js";
import parseRoute from "./lib/parse-route.jsx";
import SearchResults from "./pages/search-results.jsx";
import Home from "./pages/home";
import AppContext from "./lib/app-context.js";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import NotFound from "./pages/not-found.jsx";
import TripDetails from "./pages/trip-details.jsx";
import ReviewForm from "./pages/review-form.jsx";
import Reviews from "./pages/reviews";
import EditTrip from "./pages/edit-trip";

import Navbar from "./components/navbar";

import { GoogleApiWrapper } from "google-maps-react";
import { useState, useMemo, useEffect, createContext } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [logoutInfo, setLogoutInfo] = useState("hidden");
  const [locations, setLocations] = useState([]);
  const AppDataContext = createContext(null);

  useEffect(() => {
    fetch("api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((locations) => {
        setLocations(locations);
      })
    );
    window.addEventListener("hashchange", () => {
      const newRoute = parseRoute(window.location.hash);
      setRoute(newRoute);
    });
    const token = window.localStorage.getItem("TravelApp-token");
    const user = token ? decodeToken(token) : null;
    setUser({ user });
    setIsAuthorize(true);
    console.log("appdatacontextAPP", AppDataContext);
  }, [user]);

  const handleSignIn = (result) => {
    const { user, token } = result;
    window.localStorage.setItem("TravelApp-token", token);
    setUser({ user });
  };

  const handleLogoutWindow = () => {
    setLogoutInfo("logout-info");
  };

  const handleConfirmLogout = (event) => {
    const { route } = route;
    route.path = "";
    window.localStorage.removeItem("TravelApp-token");
    setUser(null);
    setIsAuthorize(false);
    setLogoutInfo("hidden");
  };
  const handleCancelLogout = () => {
    setLogoutInfo("hidden");
  };

  const renderPage = () => {
    if (route.path === "") {
      return <Home />;
    }
    /* if (route.path === "search-results") {
      const country = route.params.get("country");
      return <SearchResults country={country} />;
    }
    if (route.path === "trips") {
      const tripId = Number(route.params.get("tripId"));
      return <TripDetails tripId={tripId} />;
    }
    if (route.path === "sign-in") {
      return <SignInForm />;
    }
    if (route.path === "sign-up") {
      return <SignUpForm />;
    }
    if (route.path === "review-form") {
      return <ReviewForm />;
    }
    if (route.path === "my-reviews") {
      return <Reviews />;
    }
    if (route.path === "edit/trip") {
      const tripId = Number(route.params.get("tripId"));
      return <EditTrip tripId={tripId} />;
    } */
    return <NotFound />;
  };

  const contextValue = useMemo(() => ({
    locations,
    user,
    route,
    handleLogoutWindow,
    handleSignIn,
    isAuthorize,
    logoutInfo,
    handleConfirmLogout,
    handleCancelLogout,
  }));

  return (
    <AppDataContext.Provider value={contextValue}>
      <Home />
      <Navbar />
    </AppDataContext.Provider>
  );
};
/* export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: false,
      route: parseRoute(window.location.hash),
      logoutInfo: "hidden",
      locations: [],
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogoutWindow = this.handleLogoutWindow.bind(this);
    this.handleConfirmLogout = this.handleConfirmLogout.bind(this);
    this.handleCancelLogout = this.handleCancelLogout.bind(this);
  }
  componentDidMount() {
    fetch("api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((locations) => {
        this.setState({
          locations: locations,
        });
      })
    );
    window.addEventListener("hashchange", () => {
      this.setState({
        route: parseRoute(window.location.hash),
      });
    });
    const token = window.localStorage.getItem("TravelApp-token");
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: true });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem("TravelApp-token", token);
    this.setState({ user });
  }

  handleLogoutWindow() {
    this.setState({
      logoutInfo: "logout-info",
    });
  }



  handleConfirmLogout(event) {
    const { route } = this.state;
    route.path = "";
    window.localStorage.removeItem("TravelApp-token");
    this.setState({
      user: null,
      isAuthorizing: false,
      logoutInfo: "hidden",
    });
  }

  handleCancelLogout() {
    this.setState({
      logoutInfo: "hidden",
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === "") {
      return <Home />;
    }
    if (route.path === "search-results") {
      const country = route.params.get("country");
      return <SearchResults country={country} />;
    }
    if (route.path === "trips") {
      const tripId = Number(route.params.get("tripId"));
      return <TripDetails tripId={tripId} />;
    }
    if (route.path === "sign-in") {
      return <SignInForm />;
    }
    if (route.path === "sign-up") {
      return <SignUpForm />;
    }
    if (route.path === "review-form") {
      return <ReviewForm />;
    }
    if (route.path === "my-reviews") {
      return <Reviews />;
    }
    if (route.path === "edit/trip") {
      const tripId = Number(route.params.get("tripId"));
      return <EditTrip tripId={tripId} />;
    }
    return <NotFound />;
  }





  render() {
    const { user, route, isAuthorizing, logoutInfo, locations } = this.state;
    const {
      handleSignIn,
      handleLogoutWindow,
      handleConfirmLogout,
      handleCancelLogout,
    } = this;
    const contextValue = {
      locations,
      user,
      route,
      handleLogoutWindow,
      handleSignIn,
      isAuthorizing,
      logoutInfo,
      handleConfirmLogout,
      handleCancelLogout,
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
} */

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(App);

/* export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: false,
      route: parseRoute(window.location.hash),
      logoutInfo: "hidden",
      locations: [],
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogoutWindow = this.handleLogoutWindow.bind(this);
    this.handleConfirmLogout = this.handleConfirmLogout.bind(this);
    this.handleCancelLogout = this.handleCancelLogout.bind(this);
  }
  componentDidMount() {
    fetch("api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((locations) => {
        this.setState({
          locations: locations,
        });
      })
    );
    window.addEventListener("hashchange", () => {
      this.setState({
        route: parseRoute(window.location.hash),
      });
    });
    const token = window.localStorage.getItem("TravelApp-token");
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: true });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem("TravelApp-token", token);
    this.setState({ user });
  }

  handleLogoutWindow() {
    this.setState({
      logoutInfo: "logout-info",
    });
  }

  handleConfirmLogout(event) {
    const { route } = this.state;
    route.path = "";
    window.localStorage.removeItem("TravelApp-token");
    this.setState({
      user: null,
      isAuthorizing: false,
      logoutInfo: "hidden",
    });
  }

  handleCancelLogout() {
    this.setState({
      logoutInfo: "hidden",
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === "") {
      return <Home />;
    }
    if (route.path === "search-results") {
      const country = route.params.get("country");
      return <SearchResults country={country} />;
    }
    if (route.path === "trips") {
      const tripId = Number(route.params.get("tripId"));
      return <TripDetails tripId={tripId} />;
    }
    if (route.path === "sign-in") {
      return <SignInForm />;
    }
    if (route.path === "sign-up") {
      return <SignUpForm />;
    }
    if (route.path === "review-form") {
      return <ReviewForm />;
    }
    if (route.path === "my-reviews") {
      return <Reviews />;
    }
    if (route.path === "edit/trip") {
      const tripId = Number(route.params.get("tripId"));
      return <EditTrip tripId={tripId} />;
    }
    return <NotFound />;
  }

  render() {
    const { user, route, isAuthorizing, logoutInfo, locations } = this.state;
    const {
      handleSignIn,
      handleLogoutWindow,
      handleConfirmLogout,
      handleCancelLogout,
    } = this;
    const contextValue = {
      locations,
      user,
      route,
      handleLogoutWindow,
      handleSignIn,
      isAuthorizing,
      logoutInfo,
      handleConfirmLogout,
      handleCancelLogout,
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
} */
