import HeadNext from "next/head";

const Head: React.FC<{ title: string }> = ({ title }) => {
  return (
    <HeadNext>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#ffffff" />
      <link
        nonce=""
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin=""
        href="https://fonts.garmin.com/static.garmin.com/fonts/knockout/5C0E5FAA5296E3B2E.woff2"
      />
      <link
        nonce=""
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin=""
        href="https://fonts.garmin.com/static.garmin.com/fonts/knockout/1742F6AC26514B7F2.woff2"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://static.garmin.com/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://static.garmin.com/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://static.garmin.com/favicons/favicon-16x16.png"
      />
      <link
        rel="manifest"
        href="https://static.garmin.com/favicons/site.webmanifest"
      />
      <link rel="stylesheet" href="https://use.typekit.net/fti0yto.css" />
      <title>{title}</title>
      <meta
        data-n-head="ssr"
        name="description"
        content="Delivering innovative GPS technology across diverse markets, including aviation, marine, fitness, outdoor recreation, tracking and mobile apps."
      />
    </HeadNext>
  );
};

export default Head;
