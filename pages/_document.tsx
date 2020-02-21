import React from "react";
import NextDocument from "next/document";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";

export default class Document extends NextDocument {
  static async getInitialProps(ctx: any) {
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => materialUiSheets.collect(<App {...props} />)
      });

    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          <style jsx global>
            {`
              html,
              body {
                height: 100%;
              }
              #__next {
                height: 100%;
              }
              a,
              span {
                text-decoration: none;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, "Helvetica Neue", Arial, sans-serif,
                  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                background-color: #f7f7f7;
                margin: 0px;
              }
            `}
          </style>
        </React.Fragment>
      ]
    };
  }
}
