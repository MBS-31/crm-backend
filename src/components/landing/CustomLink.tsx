import React from "react";

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Link({ href, children, className, onClick, ...props }: CustomLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
