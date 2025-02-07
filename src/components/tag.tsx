interface TagProps {
    text: string;
}
const Tag: React.FC < TagProps > = ({ text }) => <span className="absolute h-auto top-[-1.53125rem] left-[0.4375rem] px-6 py-[0.2rem] text-center max-w-[9.375rem] text-white font-bold text-[0.75rem] bg-[#1c2657] rounded-t-[.625rem]"
>{text}</span>;
export default Tag;