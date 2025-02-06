interface BadgeProps {
    text: string;
}
const Badge: React.FC < BadgeProps > = ({ text }) => <span className="text-[.7647058824rem] py-[0.0625rem] inline-flex w-fit px-2 font-semibold rounded-full bg-gradient-to-r from-[#753bbd] via-[#c724b1] to-[#c724b1] text-white">{text}</span>;
export default Badge;
  