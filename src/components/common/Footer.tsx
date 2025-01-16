import style from './common.module.scss';

const Footer = () => {
  return (
    <div className={`${style.header_container} ${style.footer_container}`}>
      <div className={`${style.header_content}`}>
        <div>Footer</div>
      </div>
    </div>
  );
};

export default Footer;
