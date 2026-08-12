import {
  Briefcase,
  Brush,
  ChartLine,
  Cloud,
  Code,
  Database,
  GraduationCap,
  Headphones,
  Library,
  Mail,
  MapPin,
  Monitor,
  Palette,
  Phone,
  Rss,
  Search,
  Smartphone,
  Trophy,
  UserCheck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/content/types";

/**
 * Content modules store icons as string keys so they stay serialisable and free
 * of JSX. This is the single place that maps a key to a component — replaces the
 * old approach of embedding Font Awesome class strings in data and loading the
 * entire icon font from a CDN.
 */
const registry: Record<IconKey, LucideIcon> = {
  briefcase: Briefcase,
  users: Users,
  brush: Brush,
  bolt: Zap,
  chart: ChartLine,
  userCheck: UserCheck,
  rss: Rss,
  trophy: Trophy,
  monitor: Monitor,
  search: Search,
  smartphone: Smartphone,
  headphones: Headphones,
  palette: Palette,
  cloud: Cloud,
  code: Code,
  database: Database,
  wrench: Wrench,
  library: Library,
  graduation: GraduationCap,
  mapPin: MapPin,
  mail: Mail,
  phone: Phone,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = registry[name];
  return (
    <Component
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
