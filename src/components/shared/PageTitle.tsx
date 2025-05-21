// app/components/shared/PageTitle.tsx
import React, { ReactNode } from "react";
interface PageTitleProps {
  children: ReactNode;
  prefixText?: string;
  suffixText?: string;
  gradientClasses?: string;
  icon?: ReactNode;
  iconPosition?: "before" | "after" | "top";
  className?: string;
  h1ClassName?: string;
  subTitle?: string;
  subTitleClassName?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  prefixText,
  suffixText,
  gradientClasses = "from-sky-400 via-cyan-400 to-emerald-400",
  icon,
  iconPosition = "top",
  className = "mb-10 sm:mb-12 text-center",
  h1ClassName = "text-4xl sm:text-5xl font-extrabold",
  subTitle,
  subTitleClassName = "mt-3 text-lg text-slate-400 max-w-3xl mx-auto",
}) => {
  return (
    <header className={className}>
      {icon && iconPosition === "top" && (
        <div className="flex justify-center mb-4">{icon}</div>
      )}
      <h1 className={h1ClassName}>
        {icon && iconPosition === "before" && (
          <span className="mr-2 sm:mr-3 inline-flex items-center align-middle">
            {icon}
          </span>
        )}
        {prefixText && <span className="text-slate-100">{prefixText} </span>}
        <span
          className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientClasses} py-1`}
        >
          {children}
        </span>
        {suffixText && <span className="text-slate-100"> {suffixText}</span>}
        {icon && iconPosition === "after" && (
          <span className="ml-2 sm:ml-3 inline-flex items-center align-middle">
            {icon}
          </span>
        )}
      </h1>
      {subTitle && <p className={subTitleClassName}>{subTitle}</p>}
    </header>
  );
};

export default PageTitle;
