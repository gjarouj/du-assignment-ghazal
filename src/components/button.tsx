type buttonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "regular";
interface ButtonProps {
    type: buttonType,
    size?: ButtonSize,
    label: string,
}
function generateClassList(type: buttonType, size?: ButtonSize): string {
    switch (type) {
        case "primary":
            return "bg-blue-500 text-white hover:bg-blue-700";
          case "secondary":
            return `
            relative
            ${size && size === 'small' ? 'min-w-auto h-fit text-[0.8rem] py-1 px-3' : 'min-w-[7rem] h-full p-2'}
            bg-white
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
            `;
      }
}
const Button: React.FC < ButtonProps > = ({ type, size, label }) => <button className={`font-medium ${generateClassList(type, size)}`}>{label}</button>;
export default Button;