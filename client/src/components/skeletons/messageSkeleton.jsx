const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>{" "}
        {/* Avatar en attente */}
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Ligne de texte en attente */}
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Autre ligne de texte en attente */}
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>{" "}
          {/* Ligne de texte en attente */}
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>{" "}
        {/* Avatar en attente */}
      </div>
    </>
  );
};
export default MessageSkeleton;
