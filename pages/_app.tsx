import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import withData from "../apollo";
import theme from "../theme/theme";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props as any;
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
