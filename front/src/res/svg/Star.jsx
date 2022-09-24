export default function StarSvg({ color }) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_12_116)">
          <path
            d="M10.806 5.72699C11.1557 4.86021 12.3829 4.86021 12.7326 5.72699L14.074 9.05225C14.1231 9.17373 14.2364 9.25715 14.367 9.2678L17.7366 9.54275C18.6503 9.6173 19.0265 10.7525 18.3381 11.3579L15.7812 13.6068C15.6866 13.69 15.6446 13.8181 15.6717 13.9412L16.4894 17.6576C16.6936 18.586 15.6468 19.2783 14.8725 18.7269L11.9701 16.6604C11.8499 16.5749 11.6887 16.5749 11.5685 16.6604L8.66611 18.7269C7.89176 19.2783 6.84497 18.586 7.04921 17.6576L7.86686 13.9412C7.89394 13.8181 7.852 13.69 7.75737 13.6068L5.20035 11.3579C4.512 10.7526 4.88819 9.6173 5.80185 9.54275L9.1716 9.2678C9.30215 9.25715 9.41552 9.17373 9.46453 9.05225L10.806 5.72699Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_12_116"
            x="-13.1538"
            y="-12.9231"
            width="49.8461"
            height="49.8462"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="9" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.299107 0 0 0 0 0.558333 0 0 0 0 0 0 0 0 0.3 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_12_116"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_12_116"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
  