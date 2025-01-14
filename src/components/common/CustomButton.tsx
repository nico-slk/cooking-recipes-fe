

interface CustomButtonProps {
  text: string;
  style: string;
  fn: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

const CustomButton = ({ text, style, icon, fn, type = 'button' }: CustomButtonProps) => {

  return (
    <button className={`${style}`} onClick={fn} type={type} >
      {
        icon
          ? <img src={icon} alt={text} />
          : <p>{text}</p>
      }

    </button>
  );
};

export default CustomButton;
