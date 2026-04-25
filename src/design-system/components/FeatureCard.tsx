"use client";

export function FeatureCard({
  icon,
  title,
  description,
  children,
  className = "",
}: any) {
  return (
    <div
      className={`p-6 rounded-xl border border-[rgba(94,82,64,0.2)] bg-[rgba(94,82,64,0.12)] hover:bg-[rgba(94,82,64,0.2)] transition-colors ${className}`}
    >
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 font-bold text-[#f5f5f5]">{title}</h3>
      <p className="text-sm text-[#a7a9a9] mb-3">{description}</p>
      {children}
    </div>
  );
}

################################################################################