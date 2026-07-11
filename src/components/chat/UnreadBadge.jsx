/**
 * ==========================================================================
 * UNREAD BADGE COMPONENT
 * ==========================================================================
 * Badge showing unread message count.
 */

const UnreadBadge = ({ count = 0, size = "default" }) => {
  if (count <= 0) return null;

  const displayCount = count > 99 ? "99+" : count;

  const sizeClasses = {
    small: "min-w-[18px] h-[18px] text-[10px]",
    default: "min-w-[22px] h-[22px] text-xs",
    large: "min-w-[26px] h-[26px] text-sm",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-1.5
                  bg-red-500 text-white font-semibold rounded-full
                  ${sizeClasses[size] || sizeClasses.default}`}
    >
      {displayCount}
    </span>
  );
};

export default UnreadBadge;
