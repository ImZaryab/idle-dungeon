interface ItemListProps {
  items: {
    img: string;
    price: number;
  }[];
}

const ItemList = ({ items }: ItemListProps) => {
  return (
    <>
      <ul className="mt-6 px-5 flex gap-16 gap-y-8 flex-wrap h-[400px] overflow-y-auto">
        {items.map((i, index) => (
          <li key={index} className="relative w-fit">
            <svg
              width={32*3}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -0.5 32 32"
              shape-rendering="crispEdges"
            >
              <metadata>
                Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
              </metadata>
              <path
                stroke="#0d9068"
                d="M2 0h28M1 1h1M10 1h1M26 1h1M30 1h1M0 2h1M10 2h1M26 2h1M29 2h1M31 2h1M0 3h1M10 3h1M26 3h1M31 3h1M0 4h1M10 4h1M26 4h1M31 4h1M0 5h1M10 5h1M27 5h5M0 6h1M9 6h1M31 6h1M0 7h9M31 7h1M0 8h1M31 8h1M0 9h1M31 9h1M0 10h1M31 10h1M0 11h1M31 11h1M0 12h1M31 12h1M0 13h1M31 13h1M0 14h1M31 14h1M0 15h1M31 15h1M0 16h1M31 16h1M0 17h1M31 17h1M0 18h1M31 18h1M0 19h1M31 19h1M0 20h1M31 20h1M0 21h1M31 21h1M0 22h1M31 22h1M0 23h1M31 23h1M0 24h1M31 24h1M0 25h1M31 25h1M0 26h5M27 26h5M0 27h1M5 27h1M26 27h1M31 27h1M0 28h1M5 28h1M26 28h1M31 28h1M0 29h1M2 29h1M5 29h1M26 29h1M29 29h1M31 29h1M1 30h1M5 30h1M26 30h1M30 30h1M2 31h28"
              />
              <path
                stroke="#ecddc0"
                d="M2 1h8M11 1h15M27 1h3M1 2h9M11 2h15M27 2h2M30 2h1M1 3h9M11 3h15M27 3h4M1 4h9M11 4h15M27 4h4M1 5h9M11 5h16M1 6h8M10 6h21M9 7h22M1 8h30M1 9h30M1 10h30M1 11h30M1 12h30M1 13h30M1 14h30M1 15h30M1 16h30M1 17h30M1 18h30M1 19h30M1 20h30M1 21h30M1 22h30M1 23h30M1 24h30M1 25h30M5 26h22M1 27h4M6 27h20M27 27h4M1 28h4M6 28h20M27 28h4M1 29h1M3 29h2M6 29h20M27 29h2M30 29h1M2 30h3M6 30h20M27 30h3"
              />
            </svg>

            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {i.price}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
