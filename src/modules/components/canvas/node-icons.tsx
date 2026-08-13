import type { SVGProps } from "react";
import type { CanvasComponentType } from "@/data/canvas-component-types";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
      {...props}
    >
      {children}
    </svg>
  );
}

function ClientIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="12.5" rx="1.5" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </IconBase>
  );
}

function CdnIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="4.5" cy="6" r="1.4" />
      <circle cx="19.5" cy="6" r="1.4" />
      <circle cx="4.5" cy="18" r="1.4" />
      <circle cx="19.5" cy="18" r="1.4" />
      <path d="M9.8 10 5.6 6.9M14.2 10l4.2-3.1M9.8 14l-4.2 3.1M14.2 14l4.2 3.1" />
    </IconBase>
  );
}

function LoadBalancerIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M7.5 12h3M13 12l4.5-4.5M13 12l4.5 4.5" />
      <circle cx="19" cy="6.5" r="1.6" />
      <circle cx="19" cy="17.5" r="1.6" />
    </IconBase>
  );
}

function AppServerIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3.5" width="18" height="5" rx="1" />
      <rect x="3" y="9.75" width="18" height="5" rx="1" />
      <rect x="3" y="16" width="18" height="5" rx="1" />
      <path d="M6.2 6h.01M6.2 12.25h.01M6.2 18.5h.01" strokeWidth={2.2} />
    </IconBase>
  );
}

function CacheIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2 5 13.5h5.5L11 22l8-11.5h-5.5z" />
    </IconBase>
  );
}

function QueueIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="5" width="6" height="6" rx="1" />
      <rect x="9.5" y="5" width="6" height="6" rx="1" />
      <rect x="16.5" y="5" width="5" height="6" rx="1" />
      <path d="M4 15h16M4 19h10" />
    </IconBase>
  );
}

function DatabaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.8" />
      <path d="M4 5.5v13c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8v-13" />
      <path d="M4 12c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8" />
    </IconBase>
  );
}

export const CANVAS_NODE_ICONS: Record<CanvasComponentType, (props: IconProps) => React.JSX.Element> = {
  client: ClientIcon,
  cdn: CdnIcon,
  "load-balancer": LoadBalancerIcon,
  "app-server": AppServerIcon,
  cache: CacheIcon,
  queue: QueueIcon,
  database: DatabaseIcon,
};
