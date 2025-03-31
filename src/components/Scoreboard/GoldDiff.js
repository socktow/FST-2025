import { getDiffColor, getLineColor, formatDiff } from "../../service/goldService";

export default function GoldDiff({ diff }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-[100px]">
        <div
          className={`text-[18px] font-semibold ${getDiffColor(diff)}`}
          dangerouslySetInnerHTML={{
            __html: formatDiff(diff),
          }}
        />
      </div>
      <div
        className={`h-[3px] w-[60%] mt-1 ${getLineColor(diff)}`}
      />
    </div>
  );
} 