import React from "react";

class AutoLogout extends React.Component {
  state = {
    isLoggedIn: true,
    isIdle: false
  };

  logoutTimer = null;
  idleTimer = null;

  startLogoutTimer = () => {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(this.logout, 5000);
  };

  logout = () => {
    this.setState({ isLoggedIn: false, isIdle: false });
  };

  setUserAsIdle = () => {
    this.setState({ isIdle: true });
    this.startLogoutTimer();
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.mouseMove);
    this.startIdleTimer();
  }

  startIdleTimer = () => {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(this.setUserAsIdle, 5000);
  };

  mouseMove = () => {
    clearTimeout(this.logoutTimer);
    this.startIdleTimer();
    this.setState({ isLoggedIn: true, isIdle: false });
  };

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.mouseMove);
  }

  render() {
    const { children } = this.props;
    return (
      <div style={containerStyle}>
        {this.state.isLoggedIn == true || this.state.isIdle == true ? (
          <div style={styles}>
            {this.state.isLoggedIn && this.state.isIdle == false
              ? "Hey, you are logged in"
              : "You're about to be logged out"}
          </div>
        ) : null}
        {this.state.isLoggedIn ? (
          children
        ) : (
          <p style={{ fontSize: "20px" }}>You are logged off</p>
        )}
      </div>
    );
  }
}

const containerStyle = {
  backgroundColor: "#f1f1f1",
  height: "100%",
  width: "100%"
};

const styles = {
  backgroundColor: "#0053ad",
  height: "40px",
  color: "#ffffff",
  fontSize: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default AutoLogout;
