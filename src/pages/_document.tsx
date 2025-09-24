import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className="antialiased"
        style={{ background: "transparent", margin: 0, padding: 0 }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
