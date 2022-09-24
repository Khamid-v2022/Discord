export default function AboutSvg({ color }) {
    return (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_25_44)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.34615 12C5.34615 8.17647 8.44572 5.0769 12.2692 5.0769C16.0927 5.0769 19.1923 8.17647 19.1923 12C19.1923 15.8235 16.0927 18.9231 12.2692 18.9231C8.44572 18.9231 5.34615 15.8235 5.34615 12ZM10.7232 10.5223C11.0542 10.7138 11.4777 10.6007 11.6692 10.2697C12.3317 9.31064 13.6124 10.5877 12.5624 11.2119C12.3736 11.3241 12.1268 11.5108 11.9391 11.7396C11.7613 11.9563 11.598 12.2542 11.5788 12.6203C11.5764 12.644 11.5751 12.668 11.5751 12.6923C11.5751 13.0746 11.8851 13.3846 12.2675 13.3846C12.7952 13.3846 12.8956 13.1042 12.997 12.8213C13.0622 12.6393 13.1278 12.4563 13.3077 12.3461C13.88 11.9958 14.3462 11.3753 14.3462 10.6154C14.3462 9.46831 13.4163 8.53844 12.2693 8.53844C11.4996 8.53844 10.8287 8.95741 10.4706 9.5764C10.2792 9.90737 10.3923 10.3309 10.7232 10.5223ZM11.5751 14.7692C11.5751 14.3869 11.8851 14.0769 12.2675 14.0769C12.6498 14.0769 12.9598 14.3869 12.9598 14.7692C12.9598 15.1516 12.6498 15.4615 12.2675 15.4615C11.8851 15.4615 11.5751 15.1516 11.5751 14.7692Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_25_44"
            x="-12.6538"
            y="-12.9231"
            width="49.8462"
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
              result="effect1_dropShadow_25_44"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_25_44"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
  