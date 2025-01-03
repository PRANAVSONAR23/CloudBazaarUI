import React from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className} flex justify-center items-center `}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 172"
        className="w-1/5 h-auto"
      >
        <g
          transform="translate(0.000000,172.000000) scale(0.100000,-0.100000)"
          className="fill-gray-200 dark:fill-gray-700"
          style={{
            animation: 'fadeInOut 1 s ease-in-out infinite',
          }}
        >
          <path d="M590 1290 c-88 -11 -144 -27 -213 -61 -204 -104 -282 -328 -185 -537 33 -70 130 -162 212 -201 107 -51 182 -60 514 -61 l292 0 0 110 0 110 -274 0 c-300 0 -359 7 -426 48 -107 66 -122 208 -32 304 52 56 110 68 335 68 l203 0 77 110 c42 60 77 112 77 115 0 8 -506 3 -580 -5z" />
          <path d="M1194 1218 c-32 -46 -68 -98 -82 -115 l-24 -33 65 0 65 0 72 102 c40 57 75 108 77 115 4 10 -11 13 -55 13 l-60 0 -58 -82z" />
          <path d="M1454 1292 c-12 -8 -154 -208 -154 -216 0 -3 27 -6 60 -6 l59 0 76 106 c41 59 75 110 75 115 0 11 -101 12 -116 1z" />
          <path d="M1598 1216 c-33 -47 -70 -98 -81 -115 l-19 -31 332 0 c209 0 338 -4 351 -10 13 -7 19 -21 19 -45 0 -24 -6 -38 -19 -45 -13 -6 -162 -10 -415 -10 l-396 0 0 -266 0 -265 443 3 c398 3 447 6 494 22 67 24 121 69 144 120 22 49 25 152 5 199 -14 33 -78 97 -98 97 -6 0 7 16 30 36 81 69 91 203 21 286 -70 86 -177 108 -532 108 l-217 0 -62 -84z m598 -471 c21 -32 7 -71 -32 -85 -16 -6 -128 -9 -278 -8 l-251 3 -3 58 -3 57 275 0 276 0 16 -25z" />
        </g>
      </svg>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default Loader;