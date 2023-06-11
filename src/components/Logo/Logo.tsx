import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Styles } from '../../types/Styles';
import { LOCAL_IMG_URL } from '../../api/apiProducts';

const styles: Styles = require('./Logo.module.scss');

const logoImageStyles = {
  height: '24px',
  width: '24px'
};

const {
  Logo: logo,
  Logo__image: image,
} = styles.default;

type Props = {
  className?: string;
  onclick?: () => void;
};

export const Logo: FC<Props> = ({
  className = '',
  onclick = () => { },
}) => {
  return (
    <div className={cn(
      className,
      logo,
    )}
    >
      <Link
        to="/"
        onClick={onclick}
      >
        <img
          src={`icons/logo.svg`}
          alt="Logo"
          className={image}
          style={logoImageStyles}
        />
      </Link>
    </div>
  );
};

Logo.defaultProps = {
  className: '',
  onclick: () => { },
};
