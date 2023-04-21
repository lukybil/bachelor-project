import { COLOR_CONTRAST_SECONDARY } from '../style/theme';

interface LoadingSpinnerProps extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
}

const LoadingSpinner = ({
  stroke = COLOR_CONTRAST_SECONDARY,
  ...rest
}: LoadingSpinnerProps) => {
  return (
    <svg {...rest} width="100" height="100">
      <g transform="translate(50,50)">
        <circle
          cx="0"
          cy="0"
          r="30"
          stroke={stroke}
          strokeWidth="10"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 0 0"
            to="0 0 0"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            from="0 188.5"
            to="188.5 0"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="188.5"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export default LoadingSpinner;
