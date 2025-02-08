import React, { useState } from "react";
interface Option {
  value: string;
  label: string;
  required?: boolean;
}
interface RadioButtonProps {
  legend: string;
  name: string;
  options: Option[];
  onChange?: (value: string | null) => void;
}
const RadioButtonGroup: React.FC<RadioButtonProps> = ({
  name,
  legend,
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const handleChange = (value: string) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    if (onChange) onChange(newValue);
  };
  return (
    <fieldset className="px-0 sm:px-[1.5rem] py-4 sm:py-0">
      <legend className="absolute top-0 text-0 invisible"> {legend}</legend>
      <div className="flex flex-col">
        {" "}
        {options.map((option, index) => (
          <label
            key={`key-${option.value}-${index}`}
            className="mb-3 flex items-center cursor-pointer space-x-2"
          >
            {/* Hidden radio input with peer */}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
              className="opacity-0 m-0 block w-0 h-0 appearance-none border-none peer"
            />

            {/* Custom circle with proper gradient when checked */}
            <div
              className={`rounded-full border-2 flex items-center justify-center transition-all ${
                selected === option.value
                  ? "w-[20px] h-[20px] border-transparent bg-[radial-gradient(circle_at_center,#3A8DDE,#00a9ce)]"
                  : "w-5 h-5 bg-transparent border-gray-400"
              }`}
            >
              {/* White inner dot when checked */}
              <div
                className={`w-[16px] h-[16px] bg-transparent border-2 border-white rounded-full transition-all ${
                  selected === option.value ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </div>

            {/* Label text */}
            <span className={selected === option.value ? "font-semibold" : ""}>
              {option.label}
            </span>
          </label>
        ))}{" "}
      </div>
    </fieldset>
  );
};
export default RadioButtonGroup;
