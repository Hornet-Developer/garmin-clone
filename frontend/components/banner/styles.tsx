export const Title: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h1 className="z-10 text-white text-2xl font-semibold lg:w-96 lg:text-start lg:text-4xl lg:leading-[100%] lg:tracking-widest">
    {children}
  </h1>
);

export const Subtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="z-10 text-grey-200 text-base font-roboto font-normal whitespace-normal lg:w-96 lg:text-start lg:leading-5">
    {children}
  </p>
);
