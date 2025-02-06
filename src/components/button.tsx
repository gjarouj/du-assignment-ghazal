type buttonType = "primary" | "secondary" | "tertiary";
interface ButtonProps {
    type: buttonType,
    label: string,
}
function generateClassList(type: buttonType): string {
    switch (type) {
        case "primary":
            return "bg-blue-500 text-white hover:bg-blue-700";
          case "secondary":
            return `
            relative
            h-[2.125rem]
            w-[7rem]
            border
            rounded-[0.3125rem]
            text-[#8d007c]
            hover:bg-[linear-gradient(45deg,#753bbd,#c700b1_67%,#c700b1)]
            hover:text-white `;
          case "tertiary":
            return `
              min-w-[2.6875rem]
              h-[1.5rem]
              text-[0.7647058824rem]
              rounded-[0.3125rem]
              font-medium
              underline
              hover:text-[#c724b1]
              mt-[0.5rem]
            `;
      }
}
const Button: React.FC < ButtonProps > = ({ type, label }) => <button className={`font-medium focus:outline focus:outline-[#8d007c] focus:ring-2 focus:ring-[#8d007c] ${generateClassList(type)}`}>{label}</button>;
export default Button;
  