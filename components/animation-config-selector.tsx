import type { ConfigName } from "@/config/animation-config";
import {
  configDisplayNames,
  animationConfigs,
} from "@/config/animation-config";

type AnimationConfigSelectorProps = {
  readonly selectedConfig: ConfigName;
  readonly onConfigChange: (config: ConfigName) => void;
};

/**
 * Animation config selector component
 */
export const AnimationConfigSelector = ({
  selectedConfig,
  onConfigChange,
}: AnimationConfigSelectorProps) => {
  const config = animationConfigs[selectedConfig];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <select
        id="config-select"
        value={selectedConfig}
        onChange={(e) => onConfigChange(e.target.value as ConfigName)}
        className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[200px]"
        aria-label="Select animation config"
      >
        {(Object.keys(animationConfigs) as ConfigName[]).map((name) => (
          <option key={name} value={name}>
            {configDisplayNames[name]}
          </option>
        ))}
      </select>
      <div className="text-xs text-gray-500 mt-2 max-w-md">
        <p>
          Current config: {configDisplayNames[selectedConfig]} | Path type:{" "}
          {config.pathType} | Speed: {config.speed}s
          {config.rotation ? ` | Rotation: ${config.rotation}°` : ""}
          {config.blur ? ` | Blur: ${config.blur}px` : ""}
        </p>
      </div>
    </div>
  );
};
