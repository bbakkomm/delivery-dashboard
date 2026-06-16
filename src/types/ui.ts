import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export type PanelElement = "article" | "aside" | "div" | "section";

export type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: PanelElement;
  children: ReactNode;
};

export type MetricCardProps = HTMLAttributes<HTMLDivElement> & {
  accentClassName?: string;
  label: ReactNode;
  unit?: ReactNode;
  value: ReactNode;
};

export type SkeletonVariant = "block" | "line" | "card" | "metric" | "detail";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
};
